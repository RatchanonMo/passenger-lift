import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

export default function Modal(props) {
  const { isOpen, selectedItem, liftId, handleClose } = props;

  const [name, setName] = useState("");
  const [depart, setDepart] = useState("");
  const [detail, setDetail] = useState("");
  const [tel, setTel] = useState("");

  useEffect(() => {
    setName("");
    setDepart("");
    setDetail("");
    setTel("");
  }, [handleClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      a1: name,
      a2: "123",
    };

    axios
      .put("http://localhost:4000/lift/confirm-lift/" + liftId, formData)
      .then((res) => {
        console.log(res.data);
        console.log("Event successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    handleClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 mt-14 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-screen-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <a
                  className="fixed right-7 top-7 z-10 cursor-pointer rounded-full bg-white p-2 text-2xl text-gray-800 shadow-lg "
                  onClick={handleClose}
                >
                  <RxCross1 />
                </a>
                <h1 className="font-bold px-5 pt-8 pb-3 text-4xl">
                  ขออนุมัติการใช้เครื่องจักร
                </h1>

                {/* Main Content */}
                <form className="p-8">
                  <div className="inline-block mr-5">
                    <label className="text-2xl items-center">
                      ชื่อผู้ขออนุมัติ{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      className={`${
                        name == "" ? "" : "bg-slate-100"
                      } mb-2  rounded-xl border border-slate-200  px-4  pb-2 pt-3 text-xl text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-0`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        console.log(name);
                      }}
                    />
                  </div>
                  <div className="inline-block">
                    <label className="text-2xl items-center">บริษัท </label>
                    <br />
                    <input
                      type="text"
                      className={`${
                        depart == "" ? "" : "bg-slate-100"
                      } mb-2  rounded-xl border border-slate-200  px-4  pb-2 pt-3 text-xl text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-0`}
                      value={depart}
                      onChange={(e) => {
                        setDepart(e.target.value);
                        console.log(depart);
                      }}
                    />
                  </div>

                  <br />
                  <br />
                  <label className="text-2xl items-center">รายละเอียด </label>
                  <input
                    type="text"
                    className={`${
                      detail == "" ? "" : "bg-slate-100"
                    } mb-2 w-full rounded-xl border border-slate-200  px-4  pb-2 pt-3 text-xl text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-0`}
                    value={detail}
                    onChange={(e) => {
                      setDetail(e.target.value);
                      console.log(detail);
                    }}
                  />
                  <br />
                  <br />
                  <label className="text-2xl items-center">เบอร์ติดต่อ </label>
                  <input
                    type="text"
                    className={`${
                      tel == "" ? "" : "bg-slate-100"
                    } mb-2 w-full rounded-xl border border-slate-200  px-4  pb-2 pt-3 text-xl text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-0`}
                    value={tel}
                    onChange={(e) => {
                      setTel(e.target.value);
                      console.log(tel);
                    }}
                  />
                  <br />
                  <br />
                  <input
                    type="submit"
                    className=" mb-2 w-full rounded-xl  bg-sky-500 px-4 text-white pb-2 pt-3 text-xl  focus:border-blue-500 focus:outline-none focus:ring-0 hover:cursor-pointer"
                    value="ขออนุมัติ"
                    onClick={handleSubmit}
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
