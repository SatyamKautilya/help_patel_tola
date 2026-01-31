"use client";

import React from "react";
import { Card, CardBody, Chip, Divider } from "@heroui/react";
import { Pill, HeartPulse, Bone, AlertTriangle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Page = () => {
  const supplements = [
    {
      id: 1,
      name: "आयरन (Iron)",
      icon: <HeartPulse className="w-6 h-6 text-red-500" />,
      benefits: [
        "खून की कमी से बचाव",
        "थकान और चक्कर कम करता है",
        "माँ और बच्चे दोनों के लिए ज़रूरी",
      ],
      when: "दूसरे तिमाही से रोज़",
      color: "danger",
    },
    {
      id: 2,
      name: "कैल्शियम (Calcium)",
      icon: <Bone className="w-6 h-6 text-blue-500" />,
      benefits: [
        "बच्चे की हड्डियाँ मज़बूत बनाता है",
        "दाँत और हड्डियों की सुरक्षा",
        "माँ को कमजोरी से बचाता है",
      ],
      when: "गर्भावस्था के मध्य से",
      color: "primary",
    },
    {
      id: 3,
      name: "फोलिक एसिड (Folic Acid)",
      icon: <Pill className="w-6 h-6 text-green-500" />,
      benefits: [
        "बच्चे के दिमाग और रीढ़ के विकास में मदद",
        "जन्म दोष से बचाव",
        "शुरुआती महीनों में बहुत ज़रूरी",
      ],
      when: "गर्भधारण से लेकर 3 महीने तक",
      color: "success",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-emerald-50 px-4 pb-12">
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
        className="max-w-4xl mt-20 mx-auto pt-6"
      >
        {/* Header */}
        <Card className="rounded-3xl bg-white/80 backdrop-blur shadow-lg">
          <CardBody className="p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              गर्भावस्था में आवश्यक सप्लीमेंट
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              सप्लीमेंट शरीर की कमी पूरी करते हैं और माँ-बच्चे दोनों को स्वस्थ
              रखते हैं।
            </p>
          </CardBody>
        </Card>

        {/* Supplements Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplements.map((item) => (
            <Card key={item.id} className="rounded-3xl bg-white shadow-md">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <h2 className="text-lg font-bold text-gray-800">
                      {item.name}
                    </h2>
                  </div>
                  <Chip color={item.color} variant="flat">
                    आवश्यक
                  </Chip>
                </div>

                <Divider className="my-3" />

                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {item.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-4 h-4" />
                  <span>
                    <strong>कब लें:</strong> {item.when}
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* How to Take */}
        <Card className="mt-8 rounded-3xl bg-emerald-50 shadow-md">
          <CardBody className="p-6">
            <h3 className="text-lg font-bold text-emerald-700">
              सप्लीमेंट कैसे लें
            </h3>
            <Divider className="my-3" />
            <ul className="list-disc pl-5 text-sm text-emerald-700 space-y-2">
              <li>आयरन और कैल्शियम अलग-अलग समय पर लें</li>
              <li>दूध के साथ आयरन न लें</li>
              <li>डॉक्टर या ASHA की सलाह अनुसार लें</li>
              <li>रोज़ एक ही समय लेने की आदत डालें</li>
            </ul>
          </CardBody>
        </Card>

        {/* Warning */}
        <Card className="mt-8 rounded-3xl bg-amber-50 shadow-md">
          <CardBody className="p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-amber-700">
              <AlertTriangle className="w-5 h-5" />
              महत्वपूर्ण सावधानी
            </h3>
            <Divider className="my-3" />
            <p className="text-sm text-amber-700">
              बिना सलाह के अधिक मात्रा में सप्लीमेंट न लें। अगर उल्टी, पेट दर्द
              या एलर्जी हो तो तुरंत स्वास्थ्य केंद्र से संपर्क करें।
            </p>
          </CardBody>
        </Card>

        {/* Reminder */}
        <Card className="mt-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-xl">
          <CardBody className="p-6 text-center">
            <Clock className="mx-auto w-8 h-8 mb-2 opacity-90" />
            <h4 className="text-lg font-bold">दैनिक याद दिलाना</h4>
            <p className="mt-2 text-sm opacity-90">
              हर दिन समय पर सप्लीमेंट लेना माँ और बच्चे दोनों के लिए लाभकारी है।
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
