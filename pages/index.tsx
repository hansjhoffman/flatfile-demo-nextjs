import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import jwt from "jsonwebtoken";

/*
 * Types
 */

interface BatchData {
  batchId: string;
  data: () => Promise<unknown>;
}

interface PageProps {
  token: string;
}

/*
 * Main
 */

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const token = jwt.sign(
    {
      embed: process.env.NEXT_PUBLIC_EMBED_ID,
      user: {
        id: 42,
        email: "foo@bar.com",
        name: "Foo Bar",
      },
      org: {
        id: 4242,
        name: "Foo Bar, Inc.",
      },
      env: {
        foo: process.env.FOO, // an example of passing in a custom env variable
      },
    },
    process.env.PRIVATE_KEY || "bad_key",
    {
      expiresIn: "1h",
    },
  );

  return {
    props: {
      token,
    },
  };
};

const Home: NextPage<PageProps> = ({ token }) => {
  const importerRef = React.useRef<any>();
  const [output, setOutput] = React.useState<string>("");

  React.useEffect(() => {
    const { flatfileImporter } = require("@flatfile/sdk");
    const importer = flatfileImporter(token);

    importer.on("init", ({ batchId }: BatchData): void => {
      console.log(
        "%c" + `⥤ Batch ${batchId} has been initialized.`,
        "background-color: #4a3fd2; padding: 4px;",
      );
    });

    importer.on("launch", ({ batchId }: BatchData): void => {
      console.log(
        "%c" + `⥤ Batch ${batchId} has been launched.`,
        "background-color: #4a3fd2; padding: 4px;",
      );
    });

    importer.on("error", (error: unknown): void => {
      console.error("%c" + `⥤ ${error}`, "color: red; padding: 4px;");
    });

    importer.on("complete", async (payload: BatchData): Promise<void> => {
      const data = await payload.data();
      const serialized: string = JSON.stringify(data, null, 4);

      console.group("%c" + "⥤ SDK Output: 👇", "background-color: #4a3fd2; padding: 4px;");
      console.log("%c" + serialized, "background-color: #4a3fd2; padding: 4px;");

      setOutput(serialized);
    });

    importerRef.current = importer;
  }, [token]);

  const launchImporter = async (): Promise<void> => {
    try {
      await importerRef.current.launch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] px-64 py-8">
      <Head>
        <meta name="description" content="Flatfile nextjs portal demo" />
        <link rel="icon" href="/favicon.ico" />
        <title>Flatfile Nextjs Demo</title>
      </Head>

      <nav className="flex">
        <Image alt="Flatfile Logo" height={100} width={200} src="/flatfile-logo.svg" />
      </nav>

      <main className="flex flex-col items-center justify-center w-full mt-32">
        <div className="mb-24">
          <button
            className="text-lg text-white font-medium rounded border-none bg-[#352ab5] hover:bg-[#4a3fd2] px-5 py-2.5 cursor-pointer focus:drop-shadow-xl"
            data-embedid={process.env.NEXT_PUBLIC_EMBED_ID}
            onClick={launchImporter}>
            Import Data
          </button>
        </div>

        <div className="w-1/2">
          <label className="hidden" htmlFor="json-output">
            Flatfile JSON output
          </label>
          <textarea
            className="w-full h-96 font-mono text-white bg-gray-700 rounded p-8 overflow-y-scroll focus:drop-shadow-xl"
            id="json-output"
            name="json-output"
            readOnly
            spellCheck={false}
            value={output === "" ? "Your raw output will appear here." : output}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
