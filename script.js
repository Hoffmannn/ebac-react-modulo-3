const form = document.querySelector("form");
const submitButton = document.querySelector("#submitButton");
const formAnswers = [];

function submitForm() {
  event.preventDefault();
  submitButton.disabled = true;
  submitButton.innerHTML = "Enviando...";

  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  formAnswers.push(formProps);

  // Simulates network throttle
  setTimeout(() => {
    updateTable().then(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = "Enviar";
      form.reset();
    });
  }, 1000);
}

const updateTable = async () => {
  const table = document.querySelector("#tableBody");
  table.innerHTML = "";
  formAnswers.map((answer) => {
    const { name, rate, recommend, html, css, javascript } = answer;

    let likes = "";
    if (html) likes += " HTML;";
    if (css) likes += " CSS;";
    if (javascript) likes += " JS;";
    if (!html && !css && !javascript) likes = "Nada";

    table.innerHTML += `<tr>
    <td>${name}</td>
    <td>${rate}</td>
    <td>${recommend === "true" ? "Sim" : "Não"}</td>
    <td>${likes}</td>
    </tr>`;
  });
};
