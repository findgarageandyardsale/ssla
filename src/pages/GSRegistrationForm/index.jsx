import { useState } from "react";
import { GSForm } from "./Form";

export const GSRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // EmailJS Configuration - Replace these with your actual IDs
  const EMAILJS_SERVICE_ID = "service_kbf45wi";
  const EMAILJS_TEMPLATE_ID = "template_fpm8v17";
  const EMAILJS_PUBLIC_KEY = "mnvGGqOgwWFCuvQwA";
  const loadJsPDF = async () => {
    // Load jsPDF library if not already loaded
    if (!window.jsPDF) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      document.head.appendChild(script);

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }
  };

  const generatePDF = async (data) => {
    try {
      await loadJsPDF();

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // PDF Styling
      doc.setFontSize(20);
      doc.setTextColor(59, 130, 246); // Blue color
      doc.text("Registration Form", 105, 25, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(107, 114, 128); // Gray color
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 35, {
        align: "center",
      });

      // Draw header line
      doc.setDrawColor(59, 130, 246);
      doc.setLineWidth(1);
      doc.line(20, 40, 190, 40);

      let yPosition = 55;

      // Personal Information Section
      doc.setFontSize(14);
      doc.setTextColor(55, 65, 81); // Dark gray
      doc.text("Personal Information", 20, yPosition);

      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.5);
      doc.line(20, yPosition + 3, 190, yPosition + 3);

      yPosition += 15;
      doc.setFontSize(10);

      // Musical Instruments
      const selectedInstruments = [];
      if (data.instruments?.vocal) selectedInstruments.push("Vocal");
      if (data.instruments?.tabla) selectedInstruments.push("Tabla");
      if (data.instruments?.dilruba) selectedInstruments.push("Dilruba");
      if (data.instruments?.rabab) selectedInstruments.push("Rabab");
      if (data.instruments?.gatka) selectedInstruments.push("Gatka");

      // Time Slots
      const selectedTimeSlots = [];
      if (data.timeSlots?.saturdayMorning)
        selectedTimeSlots.push("Saturday 12:00 PM to 2:00 PM");
      if (data.timeSlots?.saturdayAfternoon)
        selectedTimeSlots.push("Saturday 3:00 PM to 5:00 PM");

      // Personal info fields
      const personalInfo = [
        [
          `First Name: ${data.firstName || "Not provided"}`,
          `Middle Name: ${data.middleName || "Not provided"}`,
        ],
        [
          `Last Name: ${data.lastName || "Not provided"}`,
          `Age: ${data.age || "Not provided"}`,
        ],
        [
          `Date of Birth: ${data.dateOfBirth || "Not provided"}`,
          `Gender: ${data.gender || "Not provided"}`,
        ],
        [
          `Father's Name: ${data.fatherName || "Not provided"}`,
          `Mother's Name: ${data.motherName || "Not provided"}`,
        ],
      ];

      personalInfo.forEach(([left, right]) => {
        doc.setTextColor(55, 65, 81); // Dark gray for labels
        doc.text(left, 20, yPosition);
        if (right) doc.text(right, 110, yPosition);
        yPosition += 8;
      });

      yPosition += 10;

      // Address Information Section
      doc.setFontSize(14);
      doc.setTextColor(55, 65, 81);
      doc.text("Address Information", 20, yPosition);

      doc.setDrawColor(229, 231, 235);
      doc.line(20, yPosition + 3, 190, yPosition + 3);

      yPosition += 15;
      doc.setFontSize(10);

      // Address fields
      doc.text(
        `Street Address: ${data.streetAddress || "Not provided"}`,
        20,
        yPosition
      );
      yPosition += 8;
      doc.text(
        `Apartment No: ${data.apartmentNo || "Not provided"}`,
        20,
        yPosition
      );
      yPosition += 8;
      doc.text(`City: ${data.city || "Not provided"}`, 20, yPosition);
      doc.text(`State: ${data.state || "Not provided"}`, 110, yPosition);
      yPosition += 8;
      doc.text(`ZIP Code: ${data.zipCode || "Not provided"}`, 20, yPosition);

      yPosition += 20;

      // Contact Information Section
      doc.setFontSize(14);
      doc.setTextColor(55, 65, 81);
      doc.text("Contact Information", 20, yPosition);

      doc.setDrawColor(229, 231, 235);
      doc.line(20, yPosition + 3, 190, yPosition + 3);

      yPosition += 15;
      doc.setFontSize(10);

      // Contact fields
      doc.text(
        `Home Phone: ${data.homePhoneNumber || "Not provided"}`,
        20,
        yPosition
      );
      doc.text(
        `Cell Phone: ${data.cellPhoneNumber || "Not provided"}`,
        110,
        yPosition
      );
      yPosition += 8;
      doc.text(`Email: ${data.email || "Not provided"}`, 20, yPosition);

      yPosition += 20;

      // Emergency Contact Section
      doc.setFontSize(14);
      doc.setTextColor(55, 65, 81);
      doc.text("Emergency Contact", 20, yPosition);

      doc.setDrawColor(229, 231, 235);
      doc.line(20, yPosition + 3, 190, yPosition + 3);

      yPosition += 15;
      doc.setFontSize(10);

      // Emergency contact fields
      doc.text(
        `Emergency Contact Name: ${
          data.emergencyContactName || "Not provided"
        }`,
        20,
        yPosition
      );
      yPosition += 8;
      doc.text(
        `Emergency Phone: ${
          data.emergencyContactPhoneNumber || "Not provided"
        }`,
        20,
        yPosition
      );
      yPosition += 8;
      doc.text(
        `Emergency Address: ${data.emergencyContactAddress || "Not provided"}`,
        20,
        yPosition
      );
      yPosition += 8;
      doc.text(
        `Emergency City: ${data.emergencyContactCity || "Not provided"}`,
        20,
        yPosition
      );
      doc.text(
        `Emergency ZIP: ${data.emergencyContactZipCode || "Not provided"}`,
        110,
        yPosition
      );

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(107, 114, 128);
      doc.text(
        "This document was generated automatically by the Registration System",
        105,
        280,
        { align: "center" }
      );

      // Save PDF locally for user
      doc.save(`registration_${data.firstName}_${data.lastName}.pdf`);

      // Return PDF as base64 for email attachment
      const pdfOutput = doc.output("datauristring");
      return pdfOutput.split(",")[1]; // Remove data:application/pdf;filename=generated.pdf;base64, prefix
    } catch (error) {
      console.error("Error generating PDF:", error);

      // Fallback: Generate simple HTML content for preview
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Registration Form - SSLA School</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td style="background-color: #3b82f6; padding: 30px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Registration Confirmation</h1>
                <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">SSLA School - Student Registration Portal</p>
                <p style="color: #c7d2fe; margin: 5px 0 0 0; font-size: 12px;">Generated on ${new Date().toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}</p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding: 30px 20px;">
                <!-- Personal Information Section -->
                <div style="margin-bottom: 30px;">
                  <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                    📋 Personal Information
                  </h2>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Full Name:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.firstName || "Not provided"
                        } ${data.middleName || ""} ${
        data.lastName || "Not provided"
      }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Age & Gender:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.age || "Not provided"
                        } years old, ${data.gender || "Not provided"}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Date of Birth:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.dateOfBirth
                            ? new Date(data.dateOfBirth).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Father's Name:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.fatherName || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Mother's Name:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.motherName || "Not provided"
                        }</span>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Contact Information Section -->
                <div style="margin-bottom: 30px;">
                  <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                    📍 Contact Information
                  </h2>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Street Address:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.streetAddress || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Apartment No:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.apartmentNo || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">City:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.city || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">State/Province:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.state || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">ZIP/Postal Code:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.zipCode || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Home Phone:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.homePhoneNumber || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Cell Phone:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.cellPhoneNumber || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Email Address:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.email || "Not provided"
                        }</span>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Emergency Contact Section -->
                <div style="margin-bottom: 30px;">
                  <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
                    🚨 Emergency Contact
                  </h2>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Emergency Contact Name:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.emergencyContactName || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Emergency Phone:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.emergencyContactPhoneNumber || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Emergency Address:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.emergencyContactAddress || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Emergency Apartment No:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.emergencyContactApartmentNo || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Emergency City:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.emergencyContactCity || "Not provided"
                        }</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;">
                        <strong style="color: #374151; font-size: 12px; text-transform: uppercase;">Emergency ZIP Code:</strong>
                        <span style="color: #1f2937; margin-left: 10px; font-size: 14px;">${
                          data.emergencyContactZipCode || "Not provided"
                        }</span>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Success Message -->
                <div style="background-color: #d1fae5; border: 1px solid #10b981; border-radius: 6px; padding: 15px; margin-bottom: 20px; text-align: center;">
                  <p style="color: #065f46; margin: 0; font-weight: bold; font-size: 14px;">
                    ✅ Registration Submitted Successfully!
                  </p>
                </div>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: #1f2937; padding: 20px; text-align: center;">
                <p style="color: #d1d5db; margin: 0 0 10px 0; font-size: 14px;">
                  Thank you for choosing <strong style="color: #3b82f6;">SSLA School</strong>
                </p>
                <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 12px;">
                  We will contact you soon at <strong style="color: #3b82f6;">${
                    data.cellPhoneNumber ||
                    data.homePhoneNumber ||
                    "the provided contact information"
                  }</strong> or <strong style="color: #3b82f6;">${
        data.email || "the provided email address"
      }</strong>
                </p>
                <p style="color: #6b7280; margin: 0; font-size: 11px;">
                  This is an automated confirmation email. Please do not reply to this message.
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      // Show HTML preview
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const newWindow = window.open(url, "_blank");
      if (newWindow) {
        newWindow.onload = () => {
          setTimeout(() => {
            newWindow.print();
            URL.revokeObjectURL(url);
          }, 100);
        };
      }

      return null; // No PDF attachment if generation fails
    }
  };

  const generateEmailContent = (data) => {
    // Get signatures from localStorage
    const storedSignatures = JSON.parse(
      localStorage.getItem("form_signatures") || "[]"
    );
    const studentSignature = storedSignatures.find(
      (sig) => sig.type === "studentSignature"
    );
    const parentSignature = storedSignatures.find(
      (sig) => sig.type === "parentSignature"
    );

    // Extract Cloudinary URLs
    const studentSignatureUrl = studentSignature?.url || "";
    const parentSignatureUrl = parentSignature?.url || "";

    // Format selected instruments
    const selectedInstruments = [];
    if (data.instruments?.vocal) selectedInstruments.push("Vocal");
    if (data.instruments?.tabla) selectedInstruments.push("Tabla");
    if (data.instruments?.dilruba) selectedInstruments.push("Dilruba");
    if (data.instruments?.rabab) selectedInstruments.push("Rabab");
    if (data.instruments?.gatka) selectedInstruments.push("Gatka");

    // Format selected time slots
    const selectedTimeSlots = [];
    if (data.timeSlots?.saturdayMorning)
      selectedTimeSlots.push("Saturday 12:00 PM to 2:00 PM");
    if (data.timeSlots?.saturdayAfternoon)
      selectedTimeSlots.push("Saturday 3:00 PM to 5:00 PM");

    return `
Dear ${data.firstName} ${data.lastName},

Thank you for your Gurmat Sangeet registration! Here are your complete details:

=== MUSICAL INSTRUMENTS ===
Selected Instruments: ${
      selectedInstruments.length > 0
        ? selectedInstruments.join(", ")
        : "None selected"
    }

=== TIME SLOTS ===
Preferred Time Slots: ${
      selectedTimeSlots.length > 0
        ? selectedTimeSlots.join(", ")
        : "None selected"
    }

=== PERSONAL INFORMATION ===
First Name: ${data.firstName || "Not provided"}
Middle Name: ${data.middleName || "Not provided"}
Last Name: ${data.lastName || "Not provided"}
Date of Birth: ${data.dateOfBirth || "Not provided"}
Age: ${data.age || "Not provided"}
Gender: ${data.gender || "Not provided"}

=== FAMILY INFORMATION ===
Father's Name: ${data.fatherName || "Not provided"}
Mother's Name: ${data.motherName || "Not provided"}

=== CONTACT INFORMATION ===
Street Address: ${data.streetAddress || "Not provided"}
Apartment No: ${data.apartmentNo || "Not provided"}
City: ${data.city || "Not provided"}
State/Province: ${data.state || "Not provided"}
ZIP/Postal Code: ${data.zipCode || "Not provided"}
Home Phone Number: ${data.homePhoneNumber || "Not provided"}
Cell Phone Number: ${data.cellPhoneNumber || "Not provided"}
Email Address: ${data.email || "Not provided"}

=== EMERGENCY CONTACT INFORMATION ===
Emergency Contact Name: ${data.emergencyContactName || "Not provided"}
Emergency Contact Phone: ${data.emergencyContactPhoneNumber || "Not provided"}
Emergency Contact Address: ${data.emergencyContactAddress || "Not provided"}
Emergency Contact Apartment No: ${
      data.emergencyContactApartmentNo || "Not provided"
    }
Emergency Contact City: ${data.emergencyContactCity || "Not provided"}
Emergency Contact Zip Code: ${data.emergencyContactZipCode || "Not provided"}

=== SIGNATURE INFORMATION ===
Student Signature Date: ${data.studentSignatureDate || "Not provided"}
Student Signature Status: ${
      studentSignature ? "✅ Uploaded" : "❌ Not uploaded"
    }
Student Signature URL: ${studentSignatureUrl}
Parent/Guardian Signature Date: ${data.parentSignatureDate || "Not provided"}
Parent/Guardian Signature Status: ${
      parentSignature ? "✅ Uploaded" : "❌ Not uploaded"
    }
Parent/Guardian Signature URL: ${parentSignatureUrl}

=== SUBMISSION DETAILS ===
Submitted on: ${new Date().toLocaleString()}
Form Type: Gurmat Sangeet Registration

We will contact you soon at ${
      data.cellPhoneNumber ||
      data.homePhoneNumber ||
      "the provided contact information"
    } or ${data.email || "the provided email address"}.

Best regards,
Gurmat Sangeet Registration Team
SSLA School

---
This is an automated confirmation email.
    `.trim();
  };

  const initializeEmailJS = async () => {
    // Load EmailJS if not already loaded
    if (!window.emailjs) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
      document.head.appendChild(script);

      await new Promise((resolve) => {
        script.onload = resolve;
      });

      window.emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  };

  const sendEmailWithPDF = async (formData) => {
    try {
      await initializeEmailJS();

      const emailContent = generateEmailContent(formData);

      // Generate PDF and get base64 data
      const pdfBase64 = await generatePDF(formData);

      // Get signatures from localStorage
      const storedSignatures = JSON.parse(
        localStorage.getItem("form_signatures") || "[]"
      );
      const studentSignature = storedSignatures.find(
        (sig) => sig.type === "studentSignature"
      );
      const parentSignature = storedSignatures.find(
        (sig) => sig.type === "parentSignature"
      );

      // Extract Cloudinary URLs
      const studentSignatureUrl = studentSignature?.url || "";
      const parentSignatureUrl = parentSignature?.url || "";

      const templateParams = {
        to_email: formData.email,
        from_name: "Gurmat Sangeet Registration System",
        user_name: `${formData.firstName} ${formData.lastName}`,
        user_email: formData.email,
        user_phone: formData.cellPhoneNumber || formData.homePhoneNumber,
        subject: "Gurmat Sangeet Registration Confirmation",
        message: emailContent,

        // Musical Instruments
        instruments_vocal: formData.instruments?.vocal ? "Yes" : "No",
        instruments_tabla: formData.instruments?.tabla ? "Yes" : "No",
        instruments_dilruba: formData.instruments?.dilruba ? "Yes" : "No",
        instruments_rabab: formData.instruments?.rabab ? "Yes" : "No",
        instruments_gatka: formData.instruments?.gatka ? "Yes" : "No",

        // Time Slots
        time_slots_saturday_morning: formData.timeSlots?.saturdayMorning
          ? "Yes"
          : "No",
        time_slots_saturday_afternoon: formData.timeSlots?.saturdayAfternoon
          ? "Yes"
          : "No",

        // Personal Information
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        age: formData.age,
        gender: formData.gender,

        // Family Information
        father_name: formData.fatherName,
        mother_name: formData.motherName,

        // Contact Information
        street_address: formData.streetAddress,
        apartment_no: formData.apartmentNo,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        home_phone_number: formData.homePhoneNumber,
        cell_phone_number: formData.cellPhoneNumber,
        email: formData.email,

        // Emergency Contact Information
        emergency_contact_name: formData.emergencyContactName,
        emergency_contact_phone: formData.emergencyContactPhoneNumber,
        emergency_contact_address: formData.emergencyContactAddress,
        emergency_contact_apartment_no: formData.emergencyContactApartmentNo,
        emergency_contact_city: formData.emergencyContactCity,
        emergency_contact_zip_code: formData.emergencyContactZipCode,

        // Signature Information
        student_signature_date: formData.studentSignatureDate,
        parent_signature_date: formData.parentSignatureDate,
        student_signature_url: studentSignatureUrl,
        parent_signature_url: parentSignatureUrl,
        student_signature_status: studentSignature
          ? "Uploaded"
          : "Not uploaded",
        parent_signature_status: parentSignature ? "Uploaded" : "Not uploaded",

        // Submission Details
        submission_date: new Date().toLocaleString(),
        form_type: "Gurmat Sangeet Registration",
      };

      // Add PDF attachment if successfully generated
      if (pdfBase64) {
        templateParams.pdf_attachment = pdfBase64;
        templateParams.pdf_filename = `registration_${formData.firstName}_${formData.lastName}.pdf`;
      }

      const response = await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log("Email sent successfully:", response);
      return { success: true, response };
    } catch (error) {
      console.error("EmailJS error:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (formData) => {
    console.log("Form submission started");
    console.log("Form data:", formData);

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      console.log("Starting EmailJS submission...");

      // Test EmailJS configuration first
      console.log("EmailJS Config:", {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY,
      });

      // Generate PDF (this will also download PDF locally and return base64 for email)
      const result = await sendEmailWithPDF(formData);
      console.log("EmailJS result:", result);

      setSubmitStatus("success");
      console.log("Form submitted successfully");

      // Reset status after successful submission
      setTimeout(() => {
        setSubmitStatus("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* <MusicRegistrationForm />
      <RegisterForm
        onSubmit={handleFormSubmit}
        submitStatus={submitStatus}
        isSubmitting={isSubmitting}
        testEmailJS={testEmailJS}
      /> */}
      <GSForm
        onSubmit={handleFormSubmit}
        submitStatus={submitStatus}
        isSubmitting={isSubmitting}
      />
    </>
  );
};
