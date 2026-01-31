"use client";

import React from "react";
import { Card, CardBody, Divider, Button } from "@heroui/react";
import {
  AlertOctagon,
  HeartPulse,
  Droplets,
  Activity,
  PhoneCall,
  Hospital,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Page = () => {
  const dangers = [
    {
      id: 1,
      icon: <Droplets className="w-7 h-7 text-red-600" />,
      title: "अधिक रक्तस्राव",
      desc: "योनि से ज़्यादा खून आना या लगातार बहना",
    },
    {
      id: 2,
      icon: <HeartPulse className="w-7 h-7 text-red-600" />,
      title: "तेज़ पेट दर्द",
      desc: "लगातार या बहुत तेज़ दर्द होना",
    },
    {
      id: 3,
      icon: <Activity className="w-7 h-7 text-red-600" />,
      title: "बच्चे की हलचल कम होना",
      desc: "बच्चा पहले से कम हिल रहा हो",
    },
    {
      id: 4,
      icon: <AlertOctagon className="w-7 h-7 text-red-600" />,
      title: "तेज़ सिरदर्द या धुंधला दिखना",
      desc: "चक्कर, आँखों के आगे अंधेरा",
    },
    {
      id: 5,
      icon: <AlertOctagon className="w-7 h-7 text-red-600" />,
      title: "तेज़ बुखार या सूजन",
      desc: "हाथ, पैर या चेहरे में अचानक सूजन",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-rose-50 to-white px-4 pb-12">
      <header className="fixed h-10 top-0 z-20 w-full bg-black/50 backdrop-blur-md border-b border-white/40"></header>
      <header className="fixed top-0 z-20 w-full bg-white/70 backdrop-blur-md border-b border-white/40">
        <div className="flex flex-col items-center pt-7">
          <Image
            src="https://8dxblayock8syelc.public.blob.vercel-storage.com/healthtoplogo.png"
            alt="Health Topics"
            width={250}
            height={56}
            priority
          />
          <div className="mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
        </div>
      </header>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mt-20  mx-auto pt-6"
      >
        {/* Header Warning */}
        <Card className="rounded-3xl bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-xl">
          <CardBody className="p-6 text-center">
            <AlertOctagon className="mx-auto w-10 h-10 mb-2" />
            <h1 className="text-2xl font-bold">खतरे के संकेत</h1>
            <p className="mt-2 text-sm opacity-90">
              इन लक्षणों में देरी न करें — तुरंत अस्पताल जाएँ
            </p>
          </CardBody>
        </Card>

        {/* Danger List */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {dangers.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl bg-white shadow-md border-l-4 border-red-500"
            >
              <CardBody className="p-5 flex gap-4">
                <div>{item.icon}</div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* What To Do */}
        <Card className="mt-8 rounded-3xl bg-red-50 shadow-md">
          <CardBody className="p-6">
            <h3 className="text-lg font-bold text-red-700">तुरंत क्या करें</h3>
            <Divider className="my-3" />
            <ul className="list-disc pl-5 text-sm text-red-700 space-y-2">
              <li>निकटतम सरकारी या निजी अस्पताल जाएँ</li>
              <li>ASHA / ANM या डॉक्टर को तुरंत सूचना दें</li>
              <li>घर पर इंतज़ार या घरेलू इलाज न करें</li>
              <li>गर्भवती महिला को अकेला न छोड़ें</li>
            </ul>
          </CardBody>
        </Card>

        {/* Emergency Actions */}
        <Card className="mt-8 rounded-3xl bg-white shadow-lg">
          <CardBody className="p-6 text-center">
            <h3 className="text-lg font-bold text-gray-800">
              आपातकालीन सहायता
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              समय पर मदद लेने से माँ और बच्चे की जान बचाई जा सकती है।
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                startContent={<PhoneCall />}
                className="bg-red-600 text-white font-semibold"
                radius="full"
              >
                एम्बुलेंस बुलाएँ
              </Button>
              <Button
                startContent={<Hospital />}
                className="bg-emerald-600 text-white font-semibold"
                radius="full"
              >
                अस्पताल खोजें
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Reassurance */}
        <Card className="mt-8 rounded-3xl bg-emerald-50 shadow-md">
          <CardBody className="p-6 text-center">
            <p className="text-sm text-emerald-700 font-semibold">
              👉 समय पर इलाज से अधिकतर समस्याएँ सुरक्षित रूप से संभाली जा सकती
              हैं। डरें नहीं, देर न करें।
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
