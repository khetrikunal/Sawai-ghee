package com.sawai.ghee.config;

import com.sawai.ghee.model.User;
import com.sawai.ghee.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Seeds default admin user on first startup if not present.
     * Default credentials: admin@sawaighee.com / Admin@123
     * Change this password immediately after first login!
     */
    @Bean
    public CommandLineRunner seedAdminUser() {
        return args -> {
            String adminEmail = "admin@sawaighee.com";
            if (!userRepository.existsByEmail(adminEmail)) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                admin.setPhone("9130643003");
                admin.setRole(User.Role.ADMIN);
                userRepository.save(admin);
                System.out.println("✅ Default admin user created: " + adminEmail);
                System.out.println("⚠️  Please change the admin password immediately after first login!");
            }
        };
    }
}
