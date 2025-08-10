// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_kbf45wi";
const EMAILJS_TEMPLATE_ID = "template_fpm8v17";
const EMAILJS_PUBLIC_KEY = "mnvGGqOgwWFCuvQwA";

// Initialize EmailJS
const initializeEmailJS = async () => {
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

// Generate beautiful HTML email content
const generateEmailHTML = (data) => {
  const storedSignatures = JSON.parse(
    localStorage.getItem("form_signatures") || "[]"
  );
  const studentSignature = storedSignatures?.find(
    (sig) => sig.type === "studentSignature"
  );
  const parentSignature = storedSignatures?.find(
    (sig) => sig.type === "parentSignature"
  );

  const studentSignatureUrl = studentSignature?.url || "";
  const parentSignatureUrl = parentSignature?.url || "";
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmation</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 600; }
        .content { padding: 40px 30px; }
        .section { margin-bottom: 30px; }
        .section-title { color: #1f2937; font-size: 20px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .field { margin-bottom: 12px; }
        .field-label { color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
        .field-value { color: #1f2937; font-size: 14px; margin-top: 4px; }
        .success-banner { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
        .footer { background-color: #1f2937; color: #d1d5db; padding: 30px; text-align: center; }
        .footer p { margin: 5px 0; }
        .school-name { color: #3b82f6; font-weight: 600; }
        .contact-info { color: #9ca3af; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>🎓 Registration Confirmation</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">
            Welcome to SSLA School!
          </p>
        </div>

        <!-- Content -->
        <div class="content">
          <!-- Success Banner -->
          <div class="success-banner">
            <h2 style="margin: 0 0 10px 0; font-size: 18px;">✅ Registration Submitted Successfully!</h2>
            <p style="margin: 0; opacity: 0.9;">Thank you for choosing SSLA School. We&apos;re excited to have you join our community!</p>
          </div>

          <!-- Personal Information -->
          <div class="section">
            <div class="section-title">👤 Personal Information</div>
            <div class="field">
              <div class="field-label">Full Name</div>
              <div class="field-value">${data.firstName} ${data.middleName || ""
    } ${data.lastName}</div>
            </div>
            <div class="field">
              <div class="field-label">Date of Birth</div>
              <div class="field-value">${data.dateOfBirth}</div>
            </div>
            <div class="field">
              <div class="field-label">Age</div>
              <div class="field-value">${data.age} years old</div>
            </div>
            <div class="field">
              <div class="field-label">Gender</div>
              <div class="field-value">${data.gender}</div>
            </div>
            <div class="field">
              <div class="field-label">Returning Student</div>
              <div class="field-value">${data.isReturningStudent === 'yes' ? 'Yes' : 'No'}</div>
            </div>
            ${data.isReturningStudent === 'yes' ? `
            <div class="field">
              <div class="field-label">Courses Completed at SSLA</div>
              <div class="field-value">${data.completedCourses || 'Not specified'}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="field-label">Occupation</div>
              <div class="field-value">${data.occupation || "Not specified"
    }</div>
            </div>
          </div>

          <!-- Family Information -->
          <div class="section">
            <div class="section-title">👨‍👩‍👧‍👦 Family Information</div>
            <div class="field">
              <div class="field-label">Father&apos;s Name</div>
              <div class="field-value">${data.fatherName}</div>
            </div>
            <div class="field">
              <div class="field-label">Mother&apos;s Name</div>
              <div class="field-value">${data.motherName}</div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="section">
            <div class="section-title">📞 Contact Information</div>
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value">${data.email || "Not provided"}</div>
            </div>
            <div class="field">
              <div class="field-label">Home Phone</div>
              <div class="field-value">${data.homePhoneNumber || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Cell Phone</div>
              <div class="field-value">${data.cellPhoneNumber || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Street Address</div>
              <div class="field-value">${data.streetAddress || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Apartment No</div>
              <div class="field-value">${data.apartmentNo || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">City & State</div>
              <div class="field-value">${data.city || "Not provided"}, ${data.state || "Not provided"
    } ${data.zipCode || "Not provided"}</div>
            </div>
          </div>

          <!-- Emergency Contact -->
          <div class="section">
            <div class="section-title">🚨 Emergency Contact</div>
            <div class="field">
              <div class="field-label">Emergency Contact Name</div>
              <div class="field-value">${data.emergencyContactName || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Emergency Phone</div>
              <div class="field-value">${data.emergencyContactPhoneNumber || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Emergency Address</div>
              <div class="field-value">${data.emergencyContactAddress || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Emergency Apartment No</div>
              <div class="field-value">${data.emergencyContactApartmentNo || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Emergency City</div>
              <div class="field-value">${data.emergencyContactCity || "Not provided"
    }, ${data.emergencyContactZipCode || "Not provided"}</div>
            </div>
          </div>

          <!-- Language Preferences -->
          <div class="section">
            <div class="section-title">📚 Language Preferences</div>
            <div class="field">
              <div class="field-label">Language Selection</div>
              <div class="field-value">${Array.isArray(data.language)
      ? data.language.join(", ")
      : data.language || "Not specified"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Speak Punjabi</div>
              <div class="field-value">${data.doYouSpeakPunjabi || "Not specified"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Read & Write Punjabi</div>
              <div class="field-value">${data.canYouReadAndWritePunjabi || "Not specified"
    }</div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="section">
            <div class="section-title">💭 Additional Information</div>
            <div class="field">
              <div class="field-label">What inspires you to learn Punjabi?</div>
              <div class="field-value">${data.whatInspiresYou || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Favorite Sikh Book</div>
              <div class="field-value">${data.favoriteSikhBook || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Daily Homework Time</div>
              <div class="field-value">${data.howMuchTimeYouWillHaveEverydayToDoYourHomework ||
    "Not provided"
    }</div>
            </div>
          </div>

          <!-- Signature Information -->
          <div class="section">
            <div class="section-title">✍️ Signature Information</div>
            <div class="field">
              <div class="field-label">Student Signature Date</div>
              <div class="field-value">${data.studentSignatureDate || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Student Signature</div>
              <div class="field-value">
                ${studentSignatureUrl && studentSignatureUrl !== "Not uploaded"
      ? `<a href="${studentSignatureUrl}" target="_blank" style="color: #3b82f6; text-decoration: underline;">View Student Signature</a>`
      : "Not uploaded"
    }
              </div>
            </div>
            <div class="field">
              <div class="field-label">Parent/Guardian Signature Date</div>
              <div class="field-value">${data.parentSignatureDate || "Not provided"
    }</div>
            </div>
            <div class="field">
              <div class="field-label">Parent/Guardian Signature</div>
              <div class="field-value">
                ${parentSignatureUrl && parentSignatureUrl !== "Not uploaded"
      ? `<a href="${parentSignatureUrl}" target="_blank" style="color: #3b82f6; text-decoration: underline;">View Parent Signature</a>`
      : "Not uploaded"
    }
              </div>
            </div>
          </div>

          <!-- Submission Details -->
          <div class="section">
            <div class="section-title">📋 Submission Details</div>
            <div class="field">
              <div class="field-label">Submission Date</div>
              <div class="field-value">${new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    )}</div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p style="margin-bottom: 15px;">
            Thank you for choosing <span class="school-name">SSLA School</span>
          </p>
          <p class="contact-info">
            We will contact you soon at <strong>${data.cellPhoneNumber ||
    data.homePhoneNumber ||
    "the provided contact information"
    }</strong> or <strong>${data.email || "the provided email address"
    }</strong>
          </p>
          <p class="contact-info" style="margin-top: 15px;">
            This is an automated confirmation email. Please do not reply to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate plain text email content
const generateEmailText = (data) => {
  const storedSignatures = JSON.parse(
    localStorage.getItem("form_signatures") || "[]"
  );
  const studentSignature = storedSignatures?.find(
    (sig) => sig.type === "studentSignature"
  );
  const parentSignature = storedSignatures?.find(
    (sig) => sig.type === "parentSignature"
  );

  const studentSignatureUrl = studentSignature?.url || "";
  const parentSignatureUrl = parentSignature?.url || "";
  return `
Dear ${data.firstName} ${data.lastName},

Thank you for your registration with SSLA School! We're excited to have you join our community.

=== PERSONAL INFORMATION ===
Name: ${data.firstName} ${data.middleName || ""} ${data.lastName}
Date of Birth: ${data.dateOfBirth}
Age: ${data.age} years old
Gender: ${data.gender}
Returning Student: ${data.isReturningStudent === 'yes' ? 'Yes' : 'No'}
${data.isReturningStudent === 'yes' ? `Courses Completed at SSLA: ${data.completedCourses || 'Not specified'}` : ''}
Occupation: ${data.occupation || "Not specified"}

=== FAMILY INFORMATION ===
Father's Name: ${data.fatherName}
Mother's Name: ${data.motherName}

=== CONTACT INFORMATION ===
Email: ${data.email || "-"}
Home Phone: ${data.homePhoneNumber || "-"}
Cell Phone: ${data.cellPhoneNumber || "-"}
Street Address: ${data.streetAddress || "-"}
Apartment No: ${data.apartmentNo || "-"}
City: ${data.city || "-"}, ${data.state || "-"} ${data.zipCode || "-"}

=== EMERGENCY CONTACT ===
Emergency Contact Name: ${data.emergencyContactName || "-"}
Emergency Phone: ${data.emergencyContactPhoneNumber || "-"}
Emergency Address: ${data.emergencyContactAddress || "-"}
Emergency Apartment No: ${data.emergencyContactApartmentNo || "-"}
Emergency City: ${data.emergencyContactCity || "-"}, ${data.emergencyContactZipCode || "-"
    }

=== COURSES ===
Courses Selection: ${Array.isArray(data.language)
      ? data.language.join(", ")
      : data.language || "-"
    }
Speak Punjabi: ${data.doYouSpeakPunjabi || "-"}
Read & Write Punjabi: ${data.canYouReadAndWritePunjabi || "-"}

=== ADDITIONAL INFORMATION ===
What inspires you to learn Punjabi: ${data.whatInspiresYou || "-"}
Favorite Sikh Book: ${data.favoriteSikhBook || "-"}
Daily Homework Time: ${data.howMuchTimeYouWillHaveEverydayToDoYourHomework || "-"
    }

=== SIGNATURE INFORMATION ===
Student Signature Date: ${data.studentSignatureDate || "-"}
Student Signature: ${studentSignatureUrl && studentSignatureUrl !== "Not uploaded"
      ? studentSignatureUrl
      : "Not uploaded"
    }
Parent/Guardian Signature Date: ${data.parentSignatureDate || "Not provided"}
Parent/Guardian Signature: ${parentSignatureUrl && parentSignatureUrl !== "Not uploaded"
      ? parentSignatureUrl
      : "Not uploaded"
    }

=== SUBMISSION DETAILS ===
Submitted on: ${new Date().toLocaleString()}

We will contact you soon at ${data.cellPhoneNumber ||
    data.homePhoneNumber ||
    "the provided contact information"
    } or ${data.email || "the provided email address"}.

Best regards,
SSLA School Registration Team

---
This is an automated confirmation email.
  `.trim();
};

// Send email with form data
export const sendRegistrationEmail = async (formData) => {
  try {
    await initializeEmailJS();

    const emailHTML = generateEmailHTML(formData);
    const emailText = generateEmailText(formData);

    // Get signature data from localStorage
    const storedSignatures = JSON.parse(
      localStorage.getItem("form_signatures") || "[]"
    );
    const studentSignature = storedSignatures?.find(
      (sig) => sig.type === "studentSignature"
    );
    const parentSignature = storedSignatures?.find(
      (sig) => sig.type === "parentSignature"
    );

    const studentSignatureUrl = studentSignature?.url || "";
    const parentSignatureUrl = parentSignature?.url || "";

    // Create comprehensive template parameters
    const templateParams = {
      // Basic EmailJS variables
      to_email: formData.email,
      to_name: `${formData.firstName} ${formData.lastName}`,
      from_name: "SSLA School Registration System",
      from_email: "noreply@sslaschool.com",
      reply_to: "admin@sslaschool.com",
      subject: "Registration Confirmation - SSLA School",

      // Primary message content
      message: emailText,
      message_html: emailHTML,

      // User information
      user_name: `${formData.firstName} ${formData.lastName}`,
      user_email: formData.email,
      user_phone: formData.cellPhoneNumber || formData.homePhoneNumber,

      // Personal Information
      first_name: formData.firstName || "Not provided",
      middle_name: formData.middleName || "Not provided",
      last_name: formData.lastName || "Not provided",
      age: formData.age || "Not provided",
      gender: formData.gender || "Not provided",
      date_of_birth: formData.dateOfBirth || "Not provided",

      // Family Information
      father_name: formData.fatherName || "Not provided",
      mother_name: formData.motherName || "Not provided",

      // Contact Information
      street_address: formData.streetAddress || "Not provided",
      apartment_no: formData.apartmentNo || "Not provided",
      city: formData.city || "Not provided",
      state: formData.state || "Not provided",
      zip_code: formData.zipCode || "Not provided",
      home_phone: formData.homePhoneNumber || "Not provided",
      cell_phone: formData.cellPhoneNumber || "Not provided",
      email: formData.email || "Not provided",

      // Emergency Contact Information
      emergency_contact_name: formData.emergencyContactName || "Not provided",
      emergency_contact_phone:
        formData.emergencyContactPhoneNumber || "Not provided",
      emergency_contact_address:
        formData.emergencyContactAddress || "Not provided",
      emergency_contact_apartment_no:
        formData.emergencyContactApartmentNo || "Not provided",
      emergency_contact_city: formData.emergencyContactCity || "Not provided",
      emergency_contact_zip_code:
        formData.emergencyContactZipCode || "Not provided",

      // Language Preferences
      language: Array.isArray(formData.language)
        ? formData.language.join(", ")
        : formData.language || "Not provided",
      speak_punjabi: formData.doYouSpeakPunjabi || "Not provided",
      read_write_punjabi: formData.canYouReadAndWritePunjabi || "Not provided",

      // Additional Information
      what_inspires: formData.whatInspiresYou || "Not provided",
      favorite_book: formData.favoriteSikhBook || "Not provided",
      homework_time:
        formData.howMuchTimeYouWillHaveEverydayToDoYourHomework ||
        "Not provided",

      // Signature Information
      student_signature_date: formData.studentSignatureDate || "Not provided",
      parent_signature_date: formData.parentSignatureDate || "Not provided",
      student_signature_url: studentSignatureUrl || "Not uploaded",
      parent_signature_url: parentSignatureUrl || "Not uploaded",

      // Submission Details
      submission_date: new Date().toLocaleString(),
      form_type: "Student Registration",
    };

    console.log("Sending email with template params:", templateParams);
    console.log("EmailJS Config:", {
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
      publicKey: EMAILJS_PUBLIC_KEY,
    });

    const response = await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log("Registration email sent successfully:", response);
    return { success: true, response };
  } catch (error) {
    console.error("EmailJS error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
  }
};
