import { supabase } from "./supabase.js";

export const getAllRecords = async () => {
  const records = await supabase.from("study-record").select("*");
  return records.data;
};

export const addTodo = async (title, time) => {
  await supabase.from("study-record").insert({ title: title, time: time });
};
