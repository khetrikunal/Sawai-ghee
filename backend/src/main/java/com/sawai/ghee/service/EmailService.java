package com.sawai.ghee.service;

import com.sawai.ghee.model.Order;
import com.sawai.ghee.model.OrderItem;
import com.sawai.ghee.model.WholesaleLead;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@sawaighee.com}")
    private String from;

    public void sendOrderConfirmation(Order order) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");

            helper.setFrom(from);
            helper.setTo(order.getCustomerEmail());
            helper.setSubject("Order Confirmed! 🪷 Sawai Gir Amrut Ghee — " + order.getId());
            helper.setText(buildOrderHtml(order), true);

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            System.err.println("Email send failed for order " + order.getId() + ": " + e.getMessage());
        }
    }

    public void sendOrderStatusUpdate(Order order) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");

            helper.setFrom(from);
            helper.setTo(order.getCustomerEmail());
            helper.setSubject("Order Status Update: " + order.getStatus() + " 🪷 Sawai Gir Amrut Ghee — " + order.getId());
            helper.setText(buildStatusUpdateHtml(order), true);

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            System.err.println("Status update email failed for order " + order.getId() + ": " + e.getMessage());
        }
    }

    public void sendWholesaleNotification(WholesaleLead lead) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(from);
            msg.setTo("admin@sawaighee.com");
            msg.setSubject("New Wholesale Enquiry — " + lead.getName());
            msg.setText(
                "New wholesale enquiry received:\n\n" +
                "Name: " + lead.getName() + "\n" +
                "Phone: " + lead.getPhone() + "\n" +
                "Email: " + lead.getEmail() + "\n" +
                "Business: " + lead.getBusinessType() + "\n" +
                "Plan: " + lead.getPlanType() + "\n" +
                "Qty200ml: " + lead.getQty200ml() + "\n" +
                "Qty500ml: " + lead.getQty500ml() + "\n" +
                "Qty1L: " + lead.getQty1L() + "\n" +
                "Total Liters: " + (lead.getTotalLiters() != null ? lead.getTotalLiters() : "") + "\n" +
                "Total Price: " + (lead.getTotalPrice() != null ? lead.getTotalPrice() : "") + "\n" +
                "City: " + lead.getCity() + "\n" +
                "Message: " + lead.getMessage()
            );
            mailSender.send(msg);
        } catch (Exception e) {
            System.err.println("Wholesale notification email failed: " + e.getMessage());
        }
    }

    private String buildOrderHtml(Order order) {
        StringBuilder itemsTable = new StringBuilder();
        BigDecimal subtotal = BigDecimal.ZERO;

        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                BigDecimal itemTotal = item.getUnitPrice().multiply(new BigDecimal(item.getQuantity()));
                subtotal = subtotal.add(itemTotal);
                itemsTable.append("<tr>")
                    .append("<td style='padding: 12px; border-bottom: 1px solid #e5dcc6; font-family: sans-serif; color: #0a1a10;'>")
                    .append(item.getProductVariant().getProduct().getName()).append(" (").append(item.getProductVariant().getSize()).append(")</td>")
                    .append("<td style='padding: 12px; border-bottom: 1px solid #e5dcc6; text-align: center; font-family: sans-serif; color: #0a1a10;'>")
                    .append(item.getQuantity()).append("</td>")
                    .append("<td style='padding: 12px; border-bottom: 1px solid #e5dcc6; text-align: right; font-family: sans-serif; color: #c9952a; font-weight: bold;'>₹")
                    .append(itemTotal.setScale(2)).append("</td>")
                    .append("</tr>");
            }
        }

        return getEmailBaseTemplate(
            "Order Confirmed!",
            "Dear " + order.getCustomerName() + ", thank you for your purchase. We are preparing your order and will dispatch it shortly.",
            "<table style='width: 100%; border-collapse: collapse; margin: 20px 0;'>" +
                "  <thead>" +
                "    <tr style='background: #0f3a2a; color: #e4b84a;'>" +
                "      <th style='padding: 12px; text-align: left; font-family: serif;'>Product</th>" +
                "      <th style='padding: 12px; text-align: center; font-family: serif;'>Qty</th>" +
                "      <th style='padding: 12px; text-align: right; font-family: serif;'>Total</th>" +
                "    </tr>" +
                "  </thead>" +
                "  <tbody>" +
                itemsTable.toString() +
                "  </tbody>" +
                "</table>" +
                "<div style='margin-top: 20px; background: #fff8eb; border: 1px solid #c9952a; padding: 15px; border-radius: 6px;'>" +
                "  <div style='display: flex; justify-content: space-between; margin-bottom: 8px; font-family: sans-serif;'>" +
                "    <span style='color: #666;'>Subtotal:</span>" +
                "    <span style='font-weight: bold; color: #0f3a2a;'>₹" + subtotal.setScale(2) + "</span>" +
                "  </div>" +
                (order.getDiscount().compareTo(BigDecimal.ZERO) > 0 ?
                    "  <div style='display: flex; justify-content: space-between; margin-bottom: 8px; font-family: sans-serif; color: #dc2626;'>" +
                        "    <span>Discount (" + (order.getCouponCode() != null ? order.getCouponCode() : "") + "):</span>" +
                        "    <span>-₹" + order.getDiscount().setScale(2) + "</span>" +
                    "  </div>" : "") +
                "  <div style='display: flex; justify-content: space-between; margin-bottom: 8px; font-family: sans-serif;'>" +
                "    <span style='color: #666;'>Shipping:</span>" +
                "    <span style='font-weight: bold; color: #0f3a2a;'>₹" + order.getShipping().setScale(2) + "</span>" +
                "  </div>" +
                "  <hr style='border: none; border-top: 1px solid #c9952a; margin: 10px 0;' />" +
                "  <div style='display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: bold; color: #0f3a2a; font-family: sans-serif;'>" +
                "    <span>Total Paid:</span>" +
                "    <span style='color: #c9952a;'>₹" + order.getTotal().setScale(2) + "</span>" +
                "  </div>" +
                "</div>" +
                "<div style='margin-top: 25px; font-family: sans-serif; color: #0a1a10; line-height: 1.6;'>" +
                "  <h3 style='color: #0f3a2a; border-bottom: 1px solid #c9952a; padding-bottom: 6px; font-family: serif;'>Delivery Details</h3>" +
                "  <p style='margin: 4px 0;'>" + order.getAddressLine() + "</p>" +
                "  <p style='margin: 4px 0;'>" + order.getCity() + ", " + order.getState() + " - " + order.getPinCode() + "</p>" +
                "  " + (order.getLandmark() != null && !order.getLandmark().isBlank() ? "<p style='margin: 4px 0; color: #666;'>Landmark: " + order.getLandmark() + "</p>" : "") +
                "</div>"
        );
    }

    private String buildStatusUpdateHtml(Order order) {
        String statusDescription;
        switch (order.getStatus()) {
            case PROCESSING:
                statusDescription = "We are currently packing your pure Bilona Ghee with care. We will notify you once it's on the way.";
                break;
            case SHIPPED:
                statusDescription = "Exciting news! Your package has been handed over to our courier partner and is on the way to you.";
                break;
            case DELIVERED:
                statusDescription = "Your order has been marked as delivered. We hope you enjoy the authentic purity of Sawai Gir Amrut Ghee!";
                break;
            case CANCELLED:
                statusDescription = "Your order has been cancelled. If this was done in error or you need a refund, please reach out immediately.";
                break;
            default:
                statusDescription = "Your order status is now " + order.getStatus() + ".";
                break;
        }

        return getEmailBaseTemplate(
            "Order Status Update: " + order.getStatus(),
            "Dear " + order.getCustomerName() + ", the status of your order <strong>" + order.getId() + "</strong> has been updated.",
            "<div style='background: #fff8eb; border-left: 4px solid #c9952a; padding: 15px; border-radius: 4px; margin: 20px 0; font-family: sans-serif;'>" +
                "  <span style='font-size: 0.85rem; letter-spacing: 1.5px; text-transform: uppercase; color: #666; font-weight: bold;'>New Status</span>" +
                "  <h2 style='color: #0f3a2a; margin: 4px 0; font-family: serif;'>" + order.getStatus() + "</h2>" +
                "  <p style='margin: 10px 0 0; color: #0a1a10; line-height: 1.6;'>" + statusDescription + "</p>" +
                "</div>" +
                "<div style='margin-top: 20px; font-family: sans-serif; color: #666; font-size: 0.9rem;'>" +
                "  Need help? Reach out to us via WhatsApp at <a href='https://wa.me/919130643003' style='color: #c9952a; font-weight: bold; text-decoration: none;'>+91 91306 43003</a>" +
                "</div>"
        );
    }

    private String getEmailBaseTemplate(String title, String summary, String content) {
        return "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "  <meta charset='utf-8'>" +
            "  <meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
            "  <title>" + title + "</title>" +
            "</head>" +
            "<body style='margin: 0; padding: 0; background-color: #fdf6e3;'>" +
            "  <table width='100%' border='0' cellspacing='0' cellpadding='0' style='background-color: #fdf6e3; padding: 20px 0;'>" +
            "    <tr>" +
            "      <td align='center'>" +
            "        <table width='100%' style='max-width: 600px; background-color: #ffffff; border: 1px solid #e5dcc6; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);'>" +
            "          <!-- HEADER -->" +
            "          <tr style='background-color: #0f3a2a; text-align: center;'>" +
            "            <td style='padding: 25px 20px;'>" +
            "              <h1 style='margin: 0; color: #e4b84a; font-family: Times New Roman, serif; font-size: 1.8rem; font-weight: normal; letter-spacing: 2px;'>🪷 SAWAI GIR AMRUT GHEE</h1>" +
            "              <span style='color: #f5ead0; font-size: 0.72rem; letter-spacing: 1.5px; text-transform: uppercase; font-family: sans-serif; display: block; margin-top: 5px;'>Vithoba Ventures Group</span>" +
            "            </td>" +
            "          </tr>" +
            "          <!-- BODY -->" +
            "          <tr>" +
            "            <td style='padding: 30px 25px;'>" +
            "              <h2 style='margin-top: 0; color: #0f3a2a; font-family: Times New Roman, serif; font-size: 1.5rem;'>" + title + "</h2>" +
            "              <p style='color: #0a1a10; font-family: sans-serif; font-size: 0.95rem; line-height: 1.6;'>" + summary + "</p>" +
            "              " + content + " + " +
            "            </td>" +
            "          </tr>" +
            "          <!-- FOOTER -->" +
            "          <tr style='background-color: #071f12; text-align: center; color: #f5ead0; font-family: sans-serif; font-size: 0.8rem;'>" +
            "            <td style='padding: 20px; border-top: 1px solid #c9952a;'>" +
            "              <p style='margin: 0 0 10px; font-family: Times New Roman, serif; font-style: italic; font-size: 1rem; color: #e4b84a;'>परंपरेची शुद्ध चव, आरोग्याचा खरा विश्वास 🪷</p>" +
            "              <p style='margin: 0; color: rgba(255,255,255,0.5);'>Team Sawai Gir Farm, Phaltan, Satara, MH</p>" +
            "            </td>" +
            "          </tr>" +
            "        </table>" +
            "      </td>" +
            "    </tr>" +
            "  </table>" +
            "</body>" +
            "</html>";
    }
}

