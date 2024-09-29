import { supabase } from "../utils/supabase";
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    getRecords();
  }, [])

  const getRecords = async () => {
    try {
      const records = await getAllRecords();
      setRecords(records);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTimeChange = (e) => {
    setNewTime(e.target.value);
  };

  const getAllRecords = async () => {
    const records = await supabase.from("study-record").select("*");
    return records.data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim() === "" && newTime.trim() === "") {
      setError("学習内容と学習時間を入力してください");
    } else if (newTitle.trim() === "" && newTime.trim() !== "") {
      setError("学習内容を入力してください");
    } else if (newTime.trim() === "" && newTitle.trim() !== "") {
      setError("学習時間を入力してください");
    } else {
      setRecords([...records, { title: newTitle, time: Number(newTime) }]);
      setNewTitle("");
      setNewTime("");
      setError("");
      setTotalTime(totalTime + Number(newTime));
    }
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <h1 className="title">学習記録一覧</h1>
          <div className="content">
            <div className="study-list">
              <h2>記録一覧</h2>
              <ul>
                {records.map((record, index) => (
                  <li key={index}>
                    <span>{record.title}</span>
                    <span> </span>
                    <span className="time">{record.time}時間</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="study-input-form">
            <div className="form-group">
              <label htmlFor="title">学習内容</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="学習内容を入力"
                value={newTitle}
                onChange={handleTitleChange}
                style={{ width: "700px" }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">学習時間</label>
              <div className="time-input">
                <input
                  type="number"
                  id="time"
                  name="time"
                  placeholder="学習時間を入力"
                  value={newTime}
                  onChange={handleTimeChange}
                  style={{ width: "50px" }}
                />
                <span>時間</span>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>
                入力されている学習内容：{newTitle}
              </p>
              <p style={{ fontWeight: "bold" }}>
                入力されている時間：{newTime}
              </p>
            </div>
            <button onClick={handleSubmit} className="submit-button">
              記録を追加
            </button>
            <p style={{ color: "red" }}>{error}</p>
            <p>
              合計時間：<span style={{ color: "#007bff" }}>{totalTime}</span>
              /1000(h)
            </p>
          </div>
        </div>
      )}
    </>
  );
};
