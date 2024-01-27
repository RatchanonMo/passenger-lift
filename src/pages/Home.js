import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import * as Realm from "realm-web";

const app = new Realm.App({ id: "application-0-eligt" });

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState([]);
  const [liftId, setLiftId] = useState("");

  const [user, setUser] = useState("");

  const [changeStream, setChangeStream] = useState([]);

  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("lift"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setChangeStream((events) => [...events, change]);
      }
    };
    login();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/lift").then((res) => {
      setData(res.data);
      console.log("fetched");
      // console.log(data);
    });
  }, [changeStream]);

  const a1_floor = [
    1, 2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33,
  ];

  const a2_floor = [
    1, 2, 3, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34,
  ];

  return (
    <div className="p-48">
      <h1 className="font-bold text-slate-800 text-6xl text-center">
        ตารางแสดงรอบการทำงาน Passenger Lift
      </h1>
      <div className="rounded-3xl my-12 ">
        <div className="grid grid-cols-7  ">
          <div className=" border-r-0 border-2 bg-slate-100 border-slate-200 p-6 rounded-tl-3xl">
            <h3 className="text-4xl ">เวลา</h3>
          </div>
          <div className="col-span-3 flex border-r-0 border-2 bg-slate-100 border-slate-200 p-6">
            <h3 className="text-3xl font-bold mr-9">A-1</h3>
            <p className="text-2xl max-w-md   inline-block">
              FL.{" "}
              {a1_floor.map((item, idx) => (
                <p className="bg-white px-3 py-1 mr-1 mb-1 text-lg inline-block rounded-lg">
                  {item}
                </p>
              ))}
            </p>
          </div>
          <div className=" col-span-3 flex  border-2 bg-slate-100 border-slate-200 p-6 rounded-tr-3xl">
            <h3 className="text-3xl font-bold mr-10">A-2</h3>
            <p className="text-2xl max-w-md inline-block">
              FL.{" "}
              {a2_floor.map((item, idx) => (
                <p className="bg-white px-3 py-1 mr-1 mb-1 text-lg inline-block rounded-lg">
                  {item}
                </p>
              ))}
            </p>
          </div>
          {data.map((item, idx) => (
            <>
              <div className=" border-r-0 border-t-0 border-2 border-slate-200 p-6">
                <h3 className="text-xl ">{item.time}</h3>
              </div>
              <div
                className="border-r-0  border-t-0 col-span-3 flex  justify-between  border-2  border-slate-200 p-6 cursor-pointer duration-100  hover:bg-slate-100"
                onClick={() => {
                  setIsOpen(true);
                  setLiftId(item._id);
                }}
              >
                <h3 className="text-2xl">{item.a1}</h3>
                {item.a1 === "" ? (
                  <h3 className="text-xl  text-white bg-green-400 px-2 rounded-lg">
                    ว่าง
                  </h3>
                ) : (
                  <h3 className="text-xl  text-white bg-red-400 px-2 rounded-lg">
                    จองแล้ว
                  </h3>
                )}
              </div>
              <div
                className="border-t-0 col-span-3 flex  justify-between  border-2  border-slate-200 p-6 cursor-pointer duration-100  hover:bg-slate-100"
                onClick={() => {
                  setIsOpen(true);
                  setLiftId(item._id);
                }}
              >
                <h3 className="text-2xl">{item.a2}</h3>
                {item.a2 === "" ? (
                  <h3 className="text-xl  text-white bg-green-400 px-2 rounded-lg">
                    ว่าง
                  </h3>
                ) : (
                  <h3 className="text-xl  text-white bg-red-400 px-2 rounded-lg">
                    จองแล้ว
                  </h3>
                )}
              </div>
            </>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        liftId={liftId}
        handleClose={() => {
          setIsOpen(false);
          setLiftId("");
        }}
      />
    </div>
  );
}
