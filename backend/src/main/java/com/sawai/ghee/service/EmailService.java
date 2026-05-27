package com.sawai.ghee.service;

import com.sawai.ghee.model.Order;
import com.sawai.ghee.model.WholesaleLead;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@sawaighee.com}")
    private String from;

    public void sendOrderConfirmation(Order order) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(from);
            msg.setTo(order.getCustomerEmail());
            msg.setSubject("Order Confirmed! 🪷 Sawai Gir Amrut Ghee — " + order.getId());
            msg.setText(buildOrderEmailText(order));
            mailSender.send(msg);
        } catch (Exception e) {
            // Log but don't fail the order
            System.err.println("Email send failed for order " + order.getId() + ": " + e.getMessage());
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
                "Quantity: " + lead.getQuantity() + "\n" +
                "City: " + lead.getCity() + "\n" +
                "Message: " + lead.getMessage()
            );
            mailSender.send(msg);
        } catch (Exception e) {
            System.err.println("Wholesale notification email failed: " + e.getMessage());
        }
    }

    private String buildOrderEmailText(Order order) {
        StringBuilder sb = new StringBuilder();
        sb.append("🪷 Sawai Gir Amrut Ghee — Order Confirmation\n");
        sb.append("A Brand by Vithoba Ventures Group of Companies\n");
        sb.append("=".repeat(55)).append("\n\n");
        sb.append("Dear ").append(order.getCustomerName()).append(",\n\n");
        sb.append("Thank you for your order! We will dispatch it within 1-2 business days.\n\n");
        sb.append("ORDER DETAILS\n");
        sb.append("-".repeat(40)).append("\n");
        sb.append("Order ID   : ").append(order.getId()).append("\n");
        sb.append("Total      : ₹").append(order.getTotal()).append("\n");
        sb.append("Status     : ").append(order.getStatus()).append("\n\n");
        sb.append("DELIVERY ADDRESS\n");
        sb.append("-".repeat(40)).append("\n");
        sb.append(order.getAddressLine()).append("\n");
        sb.append(order.getCity()).append(", ").append(order.getState()).append(" — ").append(order.getPinCode()).append("\n\n");
        sb.append("For tracking, WhatsApp us: wa.me/919130643003\n\n");
        sb.append("परंपरेची शुद्ध चव, आरोग्याचा खरा विश्वास 🪷\n");
        sb.append("Team Sawai Gir Farm, Phaltan, Satara");
        return sb.toString();
    }
}
