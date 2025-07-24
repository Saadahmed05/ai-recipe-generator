async function generateRecipe() {
  const ingredients = document.getElementById("ingredients").value;
  const diet = document.getElementById("diet").value;
  const time = document.getElementById("time").value;
  const output = document.getElementById("output");
  output.innerHTML = "🍳 Generating recipe... Please wait...";
  const prompt = `Create a detailed recipe:
Ingredients: ${ingredients}
Diet: ${diet}
Max cooking time: ${time} minutes

Include:
1. Dish name
2. Ingredients with quantity
3. Cooking steps
4. Estimated time
5. Calories (approx)
`;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer *ENTER YOUR_OPENAI_API_KEY*"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a professional chef that helps users cook based on their ingredients." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    })
  });
  const data = await response.json();
  output.innerHTML = data.choices?.[0]?.message?.content ?? "Oops, something went wrong!";
}