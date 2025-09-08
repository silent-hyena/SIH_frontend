// openRazorpay.js
export default async function openRazorpay(amount, student) {
  // load Razorpay script if not already loaded
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-sdk")) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-sdk";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  try {
    // Call backend to create Razorpay order
    const response = await fetch("http://localhost:3000/makepayment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount, currency: "INR" }), // multiply by 100
      credentials: "include",
    });

    const order = await response.json();

    if (order.alert) {
      alert(order.alert);
      return;
    }

    const options = {
      key: "rzp_test_zpN0zp46AZpzIA", // your Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: "Student Management System",
      description: "Admission Payment",
      order_id: order.id,
      prefill: {
        name: student?.name || "Student Name",
        email: student?.email || "student@example.com",
        contact: student?.contact || "9999999999",
      },
      theme: { color: "#6fd7abff" },
      handler: async function (response) {
        try {
          const verifyRes = await fetch(
            "http://localhost:3000/makepayment/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
              credentials: "include",
            }
          );

          const data = await verifyRes.json();

          if (data.status === "ok") {
            alert("Payment successful!");
            console.log("Order:", data.order);
          } else {
            alert("Payment verification failed.");
          }
        } catch (err) {
          console.error("Payment verification error:", err);
          alert("Error verifying payment.");
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (err) {
    console.error("Error creating order:", err);
    alert("Failed to initiate payment.");
  }
}
