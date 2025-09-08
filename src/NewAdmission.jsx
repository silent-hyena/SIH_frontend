import { Link } from "react-router-dom"
import { useState } from "react"
import Navbar from "./Navbar"
import FormLogin from "./form"
import openRazorpay from "./Razorpay"
import { useForm } from "react-hook-form";



function NewAdmission() {
    const [showAdmissionform, setShowAdmissionForm] = useState(false)
    const [showpayment, setShowPayment] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    function handleFormBtn() {
        setShowAdmissionForm(!showAdmissionform);
        setShowPayment(false);
    }

    function handlePaymentBtn() {
        setShowAdmissionForm(false);
        setShowPayment(!showpayment);
        // window.location.href = "..Frontend/razorpay.html";

    }

    function handlePaymentFormSubmit(data) {
        // alert(  data.name,  data.amount);
        console.log(data)
        openRazorpay(Number(data.amount), { amount: data.amount })

    }
    async function handleFormSubmit(data) {
        // console.log(data);
        const response = await fetch("http://localhost:3000/formsubmit", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // send JSON
            body: JSON.stringify(data), // form fields -> JSON string
        });

        const Data = await response.json();
        console.log("Server response:", Data);

    }
    return (
        <>

            <Navbar />

            <div className="container-fluid">
                <button className="btn btn-light" onClick={handleFormBtn}>Fill Admission Form</button>

                {/* <OpenRazorpay amount={10} student={{ name: "Ayush", email: "ayush@example.com", contact: "9999999999" }} /> */}
                <button className="btn btn-light" onClick={handlePaymentBtn}>Make Payment</button>
            </div>

            {/* form to enter payment detail */}
            {showpayment && (
                <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
                        <h2 className="text-center mb-4" style={{ color: "#488aa4" }}>
                            Make Payment
                        </h2>

                        <form onSubmit={handleSubmit(handlePaymentFormSubmit)}>
                            {/* Name Field */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    placeholder="Enter your name"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name.message}</div>
                                )}
                            </div>

                            {/* Amount Field */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Amount (INR)</label>
                                <input
                                    type="number"
                                    className={`form-control ${errors.amount ? "is-invalid" : ""}`}
                                    placeholder="Enter amount"
                                    {...register("amount", { required: "Amount is required", min: 1 })}
                                />
                                {errors.amount && (
                                    <div className="invalid-feedback">{errors.amount.message}</div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn   w-100"  style={{ backgroundColor: "#55b4da" }}>
                                Pay Now
                            </button>
                        </form>
                    </div>
                </div>
            )}



            <div className="container-fluid">
                {showAdmissionform && <FormLogin formData={handleFormSubmit} />}
            </div>


        </>
    )
}
export default NewAdmission