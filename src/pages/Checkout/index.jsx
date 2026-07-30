// ============================================================
// Checkout Page — Step 2: Contact Information, Delivery Address & Payment Method
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2, ShieldCheck, Truck, RotateCcw, Headphones,
  Lock, ArrowRight, Check, CreditCard, Smartphone, Building2, Wallet
} from 'lucide-react';
import PageWrapper from '../../components/ui/PageWrapper';
import { toast } from 'react-hot-toast';

export default function Checkout() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Shailendra Kumar',
    email: 'shailendra@example.com',
    mobile: '9876543210',
    address: 'Flat 402, Block B, Tech Park Apartments',
    city: 'New Delhi',
    state: 'Delhi',
    pinCode: '110001',
    couponCode: '',
    paymentMethod: 'upi',
  });

  const [appliedCoupon, setAppliedCoupon] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!formData.couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }
    setAppliedCoupon(true);
    toast.success('Coupon "DEVOPSX100" applied! ₹100 discount added.');
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    navigate('/payment');
  };

  // Order summary calculations
  const originalPrice = 799;
  const discount = 300 + (appliedCoupon ? 100 : 0);
  const subtotal = originalPrice - discount;
  const shipping = 0;
  const gst = 90;
  const totalAmount = subtotal + gst;

  return (
    <PageWrapper>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* ── STEP NAVIGATION BAR (Cart > Checkout > Payment > Success) ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
          padding: '16px', borderRadius: '12px', background: '#ffffff',
          border: '1px solid #eaecf0', fontSize: '0.85rem', color: '#667085',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#667085' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#f2f4f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700 }}>1</span>
            <span>Cart</span>
          </div>
          <span style={{ width: '40px', height: '1px', background: '#2563eb' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 700 }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700 }}>2</span>
            <span>Checkout</span>
          </div>
          <span style={{ width: '40px', height: '1px', background: '#eaecf0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#98a2b3' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#f2f4f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700 }}>3</span>
            <span>Payment</span>
          </div>
          <span style={{ width: '40px', height: '1px', background: '#eaecf0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#98a2b3' }}>
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#f2f4f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700 }}>4</span>
            <span>Success</span>
          </div>
        </div>

        {/* ── PAGE HEADER TITLE ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ color: '#101828', fontFamily: 'Inter, sans-serif', fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>
            Checkout
          </h1>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#667085', background: '#f2f4f7', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
            <Lock size={13} color="#667085" /> Secure Checkout
          </span>
        </div>

        {/* ── 2-COLUMN MAIN CONTENT GRID ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr minmax(320px, 380px)', gap: '28px', alignItems: 'start',
        }}>

          {/* LEFT COLUMN: CHECKOUT FORM STEPS 1 to 4 */}
          <form onSubmit={handleProceedToPayment} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Step 1: Contact Information */}
            <div style={{ background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '14px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ color: '#101828', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                1. Contact Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div style={{ background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '14px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ color: '#101828', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                2. Delivery Address
              </h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House no., Building, Street, Area"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none', background: '#fff' }}
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>
              </div>

              <div style={{ width: '50%' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#344054', fontWeight: 600, marginBottom: '6px' }}>
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  placeholder="Enter PIN code"
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>
            </div>

            {/* Step 3: Coupon Code */}
            <div style={{ background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '14px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ color: '#101828', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                3. Coupon Code
              </h3>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleInputChange}
                  placeholder="Enter coupon code (e.g. DEVOPSX100)"
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #d0d5dd', fontSize: '0.85rem', outline: 'none', textTransform: 'uppercase' }}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  style={{ padding: '10px 20px', borderRadius: '8px', background: '#ffffff', border: '1px solid #d0d5dd', color: '#344054', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div style={{ background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '14px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ color: '#101828', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                4. Payment Method
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {[
                  { id: 'upi', label: 'UPI', desc: 'Pay using UPI', icon: Smartphone },
                  { id: 'card', label: 'Card', desc: 'Debit / Credit Card', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', desc: 'All major banks', icon: Building2 },
                  { id: 'wallet', label: 'Wallet', desc: 'Pay using wallet', icon: Wallet },
                ].map((pm) => {
                  const isSelected = formData.paymentMethod === pm.id;
                  const IconComp = pm.icon;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                      style={{
                        padding: '14px 10px', borderRadius: '10px',
                        border: `2px solid ${isSelected ? '#2563eb' : '#eaecf0'}`,
                        background: isSelected ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                      }}
                    >
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: isSelected ? '#2563eb' : '#f2f4f7', color: isSelected ? '#fff' : '#667085', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComp size={16} />
                      </div>
                      <strong style={{ fontSize: '0.82rem', color: '#101828' }}>{pm.label}</strong>
                      <span style={{ fontSize: '0.68rem', color: '#667085' }}>{pm.desc}</span>
                    </div>
                  );
                })}
              </div>

              {/* Security badges bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #eaecf0', fontSize: '0.72rem', color: '#667085', marginTop: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#2563eb" /> 100% Secure Payment
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Truck size={14} color="#2563eb" /> Fast & Safe Delivery
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RotateCcw size={14} color="#2563eb" /> Easy Returns Policy
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Headphones size={14} color="#2563eb" /> 24/7 Customer Support
                </div>
              </div>

              {/* Continue to Payment Button */}
              <button
                type="submit"
                style={{
                  marginTop: '10px', width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                  background: '#2563eb', color: '#ffffff', fontSize: '0.95rem', fontWeight: 800,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.3)', transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <Lock size={16} /> Continue to Payment
              </button>
            </div>

          </form>

          {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR CARD */}
          <div style={{
            background: '#ffffff', border: '1px solid #eaecf0', borderRadius: '14px',
            padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px',
            boxShadow: '0 1px 3px rgba(16,24,40,0.04)', position: 'sticky', top: '90px',
          }}>
            <h3 style={{ color: '#101828', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
              Order Summary
            </h3>

            {/* Product Item Preview */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop"
                alt="Book cover"
                style={{ width: '56px', height: '74px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #eaecf0' }}
              />
              <div>
                <h4 style={{ color: '#101828', fontSize: '0.85rem', fontWeight: 700, margin: '0 0 2px' }}>
                  Artificial Intelligence for Beginners
                </h4>
                <span style={{ fontSize: '0.72rem', color: '#667085' }}>by Shailendra Kumar</span>
              </div>
            </div>

            <div style={{ height: '1px', background: '#eaecf0' }} />

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#667085' }}>Price</span>
                <span style={{ color: '#101828', fontWeight: 600 }}>₹{originalPrice}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#027a48' }}>
                <span>Discount ({appliedCoupon ? '48%' : '38%'})</span>
                <span style={{ fontWeight: 700 }}>- ₹{discount}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#667085' }}>Subtotal</span>
                <span style={{ color: '#101828', fontWeight: 600 }}>₹{subtotal}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#667085' }}>Shipping</span>
                <span style={{ color: '#027a48', fontWeight: 700 }}>Free</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#667085' }}>GST (18%)</span>
                <span style={{ color: '#101828', fontWeight: 600 }}>₹{gst}</span>
              </div>
            </div>

            <div style={{ height: '1px', background: '#eaecf0' }} />

            {/* Total Amount */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ fontSize: '0.95rem', color: '#101828' }}>Total Amount</strong>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#101828' }}>₹{totalAmount}</span>
            </div>

            {/* Savings Pill */}
            <div style={{ padding: '8px 12px', borderRadius: '6px', background: '#ecfdf3', border: '1px solid #abefc6', color: '#027a48', fontSize: '0.76rem', fontWeight: 700, textAlign: 'center' }}>
              🏷️ You will save ₹{discount} on this order
            </div>
          </div>

        </div>

      </div>
    </PageWrapper>
  );
}
