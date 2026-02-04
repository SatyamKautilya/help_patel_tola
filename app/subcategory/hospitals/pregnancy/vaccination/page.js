"use client";

import React from "react";
import { Card, CardBody, Chip, Divider, Button } from "@heroui/react";
import { CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Page = () => {
  const vaccinations = [
    {
      id: 1,
      name: "टीटी इंजेक्शन – पहला डोज",
      time: "गर्भावस्था के 12–16 सप्ताह",
      status: "completed", // completed | pending
    },
    {
      id: 2,
      name: "टीटी इंजेक्शन – दूसरा डोज",
      time: "पहले डोज के 4 सप्ताह बाद",
      status: "pending",
    },
    {
      id: 3,
      name: "बूस्टर डोज (यदि आवश्यक हो)",
      time: "डॉक्टर की सलाह अनुसार",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-sky-100 px-4 pb-12">
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
          <div className="mt-3 h-[2px] w-4/5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
        </div>
      </header>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mt-20 mx-auto pt-6"
      >
        {/* Header Card */}
        <Card className="rounded-3xl bg-white/80 backdrop-blur shadow-lg">
          <CardBody className="p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              गर्भावस्था टीकाकरण
            </h1>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              टीकाकरण माँ और बच्चे दोनों को गंभीर बीमारियों से सुरक्षित रखने में
              मदद करता है।
            </p>
          </CardBody>
        </Card>

        {/* Vaccination List */}
        <div className="mt-6 space-y-4">
          {vaccinations.map((vaccine) => (
            <Card key={vaccine.id} className="rounded-2xl bg-white shadow-md">
              <CardBody className="flex items-center gap-4 p-5">
                <div>
                  {vaccine.status === "completed" ? (
                    <CheckCircle className="text-emerald-500 w-7 h-7" />
                  ) : (
                    <AlertTriangle className="text-amber-500 w-7 h-7" />
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {vaccine.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{vaccine.time}</span>
                  </div>
                </div>

                <Chip
                  color={vaccine.status === "completed" ? "success" : "warning"}
                  variant="flat"
                  className="font-semibold"
                >
                  {vaccine.status === "completed" ? "लग चुका है" : "बाकी है"}
                </Chip>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Next Vaccination Highlight */}
        <Card className="mt-8 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-xl">
          <CardBody className="p-6 text-center">
            <h3 className="text-xl font-bold">अगला आवश्यक टीका</h3>
            <p className="mt-2 text-sm opacity-90">टीटी इंजेक्शन – दूसरा डोज</p>
            <p className="mt-1 text-sm opacity-90">पहले डोज के 4 सप्ताह बाद</p>

            <Button
              className="mt-4 bg-white text-rose-600 font-semibold"
              radius="full"
            >
              याद दिलाने के लिए सेट करें
            </Button>
          </CardBody>
        </Card>

        {/* Important Info */}
        <Card className="mt-8 rounded-3xl bg-white shadow-md">
          <CardBody className="p-6">
            <h4 className="text-lg font-bold text-gray-800">
              महत्वपूर्ण जानकारी
            </h4>
            <Divider className="my-3" />
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>टीका केवल प्रशिक्षित स्वास्थ्य कर्मी से ही लगवाएँ।</li>
              <li>टीका लगवाने के बाद हल्का दर्द या सूजन सामान्य है।</li>
              <li>किसी भी परेशानी में तुरंत नज़दीकी अस्पताल जाएँ।</li>
            </ul>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
