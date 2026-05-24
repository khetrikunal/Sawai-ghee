# 💳 Razorpay Integration Guide
## Sawai Gir Amrut Ghee — Payment Setup

---

## 1. Create Razorpay Account

1. Go to **https://dashboard.razorpay.com/signup**
2. Complete KYC (business registration, PAN, bank account)
3. For testing, use **Test Mode** (toggle in dashboard)

---

## 2. Get API Keys

1. Dashboard → **Settings** → **API Keys**
2. Click **Generate Test Key**
3. Save:
   - **Key ID**: `rzp_test_XXXXXXXXXXXXXXXX`
   - **Key Secret**: `XXXXXXXXXXXXXXXXXXXXXXXX`

---

## 3. Add Keys to Project

### Backend (`application.properties`)
```properties
razorpay.key.id=rzp_test_YOUR_KEY_ID
razorpay.key.secret=YOUR_KEY_SECRET
```

### Frontend (`.env`)
```env
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
```

---

## 4. Payment Flow

```
┌─────────────┐     1. POST /api/payments/create-order     ┌─────────────┐
│   Frontend  │ ──────────────────────────────────────────► │   Backend   │
│   (React)   │                                             │ (Spring Boot│
│             │ ◄──────────────────────────────────────────  │             │
│             │   2. Returns { id: "order_xyz", amount }    │             │
│             │                                             │             │
│             │   3. Opens Razorpay Checkout UI             └──────┬──────┘
│             │      (user pays via UPI/card/netbanking)           │
│             │                                                     │ 5. Razorpay
│             │   4. Payment success → returns                      │    SDK call
│             │      { payment_id, order_id, signature }           │
│             │                                                     │
│             │     6. POST /api/payments/verify                   │
│             │ ──────────────────────────────────────────►        │
│             │                                             ┌──────▼──────┐
│             │   7. Verified → order status = PROCESSING   │   Backend   │
│             │ ◄──────────────────────────────────────────  │  verifies   │
│             │                                             │  HMAC sig   │
│             │   8. Navigate to /order-success             └─────────────┘
└─────────────┘
```

---

## 5. Signature Verification (Backend)

The backend verifies the HMAC-SHA256 signature to confirm the payment is genuine:

```java
// PaymentController.java
String payload = razorpayOrderId + "|" + razorpayPaymentId;
Mac mac = Mac.getInstance("HmacSHA256");
mac.init(new SecretKeySpec(razorpayKeySecret.getBytes(), "HmacSHA256"));
byte[] hash = mac.doFinal(payload.getBytes());
String computed = HexFormat.of().formatHex(hash);

if (!computed.equals(razorpaySignature)) {
    throw new PaymentVerificationException("Signature mismatch!");
}
```

---

## 6. Webhook Setup (Recommended for Production)

1. Dashboard → **Settings** → **Webhooks** → **Add Webhook**
2. URL: `https://yourdomain.com/api/payments/webhook`
3. Secret: Generate a strong secret string
4. Select events:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`

### Webhook Handler Events
```java
// Handle in PaymentController.webhook()
switch (event) {
    case "payment.captured" -> updateOrderStatus(orderId, PROCESSING);
    case "payment.failed"   -> updateOrderStatus(orderId, CANCELLED);
    case "order.paid"       -> sendConfirmationEmail(orderId);
}
```

---

## 7. Test Card Numbers

| Card Type   | Number              | CVV  | Expiry  |
|-------------|---------------------|------|---------|
| Visa        | 4111 1111 1111 1111 | Any  | Any future |
| Mastercard  | 5267 3181 8797 5449 | Any  | Any future |
| Rupay       | 6073 8499 1102 1999 | Any  | Any future |

### Test UPI
- Success: `success@razorpay`
- Failure: `failure@razorpay`

---

## 8. Go Live Checklist

- [ ] Complete Razorpay KYC
- [ ] Switch from test keys to live keys
- [ ] Set `VITE_RAZORPAY_KEY_ID` to live key
- [ ] Test full payment flow in live mode
- [ ] Set up webhook with live URL
- [ ] Enable 3D Secure for cards
- [ ] Configure refund policy in dashboard

---

## 9. Refund Process

```java
// Example refund via Razorpay SDK
RazorpayClient client = new RazorpayClient(keyId, keySecret);
JSONObject refundRequest = new JSONObject();
refundRequest.put("amount", 69900); // in paise
Refund refund = client.payments.refund(paymentId, refundRequest);
```

---

## Support
- Razorpay Docs: https://razorpay.com/docs/
- Integration Help: https://razorpay.com/docs/payment-gateway/
- Razorpay Support: https://razorpay.com/support/
