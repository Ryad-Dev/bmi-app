const config = {
  appName: "coursQuiz",
  appDescription:
    "coursQuiz aide les etudiants a reviser efficacement grace a des quiz interactifs.",
  domainName:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://coursquiz.com/",
};

export default config;

