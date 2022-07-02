(function () {
  try {
    window.onload = () => {
      console.log(
        "\n\n" +
          "███████╗██╗      █████╗ ████████╗███████╗██╗██╗     ███████╗\n" +
          "██╔════╝██║     ██╔══██╗╚══██╔══╝██╔════╝██║██║     ██╔════╝\n" +
          "█████╗  ██║     ███████║   ██║   █████╗  ██║██║     █████╗\n" +
          "██╔══╝  ██║     ██╔══██║   ██║   ██╔══╝  ██║██║     ██╔══╝\n" +
          "██║     ███████╗██║  ██║   ██║   ██║     ██║███████╗███████╗\n" +
          "╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝\n\n" +
          "Data onboarding at its finest.\n\n" +
          "WE'RE HIRING: https://flatfile.com/careers\n" +
          "CONTACT US:   support@flatfile.com\n",
      );
    };
  } catch (_err) {
    // on server so it's ok
  }
})();

export {};
