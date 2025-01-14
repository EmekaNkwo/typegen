import { useState } from "react";
import { generateType as generate } from "./generator.js";
import Github from "@mui/icons-material/GitHub.js";
import Twitter from "@mui/icons-material/Twitter.js";
import "./App.css";
import prettier from "prettier/standalone";
import typescript from "prettier/plugins/typescript";
import estree from "prettier/plugins/estree";

function App() {
  const [text, setText] = useState("");
  const [gen, setGen] = useState("");
  const [typeName, setType] = useState("");

  const generateType = () => {
    try {
      const obj = JSON.parse(text);

      const t = generate(obj);
      prettier
        .format(`type ${typeName} = ` + t, {
          parser: "typescript",
          plugins: [typescript, estree],
        })
        .then((s) => setGen(s))
        .catch((err) => setGen(err));
    } catch (err) {
      setGen(err.message);
    }
  };

  return (
    <>
      <div className="App">
        <div className="row">
          <div className="row_heading">
            <h1>Type Generator</h1>
            <small>if you like it, give the repo a ⭐️?</small>
          </div>
          <div className="navList">
            <a
              className="p-2"
              href="https://github.com/peteradeojo/typegen"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              <Github fontSize="large" />
            </a>
            <a
              href="https://twitter.com/boluwatifee__"
              rel="noreferrer"
              target="_blank"
              className="p-2"
            >
              <Twitter fontSize="large" />
            </a>
          </div>
        </div>
        <div className="p-2"></div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateType();
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter Type Name"
              onInput={(e) => setType(e.target.value)}
              value={typeName}
              required
            />
            <div className="p-1"></div>
            <textarea
              className="p-2"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='{"message": "Paste JSON schema"}'
              required
            >
              {text}
            </textarea>
            <button
              type="submit"
              style={{
                marginTop: 10,
              }}
            >
              Generate Type
            </button>
          </form>
        </div>
        <div className="p-1"></div>
        <textarea className="p-2" value={gen} readOnly></textarea>
      </div>
    </>
  );
}

export default App;
