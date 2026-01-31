"use client";

import React from "react";
import { Card, CardBody, Chip, Divider, Button } from "@heroui/react";
import {
  Stethoscope,
  CalendarDays,
  ClipboardCheck,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Page = () => {
  const visits = [
    {
      id: 1,
      title: "पहली जाँच",
      time: "1–3 महीना",
      color: "success",
      checks: [
        "गर्भ की पुष्टि",
        "वजन और रक्तचाप जाँच",
        "खून और पेशाब की जाँच",
        "फोलिक एसिड सलाह",
      ],
    },
    {
      id: 2,
      title: "दूसरी जाँच",
      time: "4–6 महीना",
      color: "primary",
      checks: [
        "बच्चे की वृद्धि जाँच",
        "हीमोग्लोबिन जाँच",
        "टीटी टीकाकरण",
        "भोजन व सप्लीमेंट सलाह",
      ],
    },
    {
      id: 3,
      title: "तीसरी जाँच",
      time: "7–9 महीना",
      color: "danger",
      checks: [
        "बच्चे की स्थिति",
        "डिलीवरी की तैयारी",
        "अस्पताल चयन",
        "आपातकालीन संकेत समझाना",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-cyan-50 to-emerald-50 px-4 pb-12">
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
              डॉक्टर जाँच समय-सारणी
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              समय पर जाँच माँ और बच्चे दोनों की सुरक्षा सुनिश्चित करती है।
            </p>
          </CardBody>
        </Card>

        {/* Visit Cards */}
        <div className="mt-6 space-y-6">
          {visits.map((visit) => (
            <Card key={visit.id} className="rounded-3xl bg-white shadow-md">
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="w-6 h-6 text-emerald-500" />
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        {visit.title}
                      </h2>
                      <p className="text-sm text-gray-600">{visit.time}</p>
                    </div>
                  </div>
                  <Chip color={visit.color} variant="flat">
                    अनिवार्य
                  </Chip>
                </div>

                <Divider className="my-4" />

                <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <ClipboardCheck className="w-5 h-5" />
                  इस जाँच में क्या होगा
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {visit.checks.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Next Visit Highlight */}
        <Card className="mt-8 rounded-3xl bg-gradient-to-br from-cyan-500 to-sky-500 text-white shadow-xl">
          <CardBody className="p-6 text-center">
            <CalendarDays className="mx-auto w-8 h-8 mb-2 opacity-90" />
            <h3 className="text-xl font-bold">अगली निर्धारित जाँच</h3>
            <p className="mt-2 text-sm opacity-90">
              दूसरी जाँच – 4 से 6 महीने के बीच
            </p>
            <Button
              className="mt-4 bg-white text-sky-600 font-semibold"
              radius="full"
            >
              याद दिलाने के लिए सेट करें
            </Button>
          </CardBody>
        </Card>

        {/* Important Advice */}
        <Card className="mt-8 rounded-3xl bg-amber-50 shadow-md">
          <CardBody className="p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-amber-700">
              <AlertCircle className="w-5 h-5" />
              महत्वपूर्ण सलाह
            </h3>
            <Divider className="my-3" />
            <ul className="list-disc pl-5 text-sm text-amber-700 space-y-2">
              <li>हर जाँच की पर्ची संभाल कर रखें</li>
              <li>कोई भी तकलीफ़ छुपाएँ नहीं</li>
              <li>जाँच में देर न करें</li>
              <li>ज़रूरत हो तो परिवार के सदस्य को साथ लाएँ</li>
            </ul>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
