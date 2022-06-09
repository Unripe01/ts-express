import cors from "cors";
import express, { NextFunction } from "express";
import { Health } from "../types/api";

const app = express();

//----------------------------------------------------
//
//deal with cors
app.use(cors());

//----------------------------------------------------
//
// Route
app.get("/api/health", (req, res) => {
  const data: Health = { message: "pong" };
  res.send(data);
});

//----------------------------------------------------
//
// Routeに一致しないRequest
app.use((req, res, next) => {
  res.sendStatus(404);
  next({ statusCode: 404 }); // エラーロギング！
});

//----------------------------------------------------
//
// Error Route
app.use(
  (
    err: { statusCode: number },
    req: Express.Request,
    res: Express.Response,
    next: NextFunction // next() に渡されたコードを最終のエラーハンドラであるここのerrで受け取るために、第4引数を指定している
  ) => {
    console.log(err.statusCode);
  }
);

//----------------------------------------------------
//
// Express Serverの起動
const port = 8888;
const host = "localhost";

app.listen(port, host, () => {
  console.log(`Running on http://${host}:${port}`);
});
