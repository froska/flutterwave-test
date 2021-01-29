import app from "./server.mjs";
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
