package com.example.demo.Entity;
// package com.hari.Finance.Manager.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {
    @Id @GeneratedValue
    private Long id;

    private String username;
    private String password;
    private String email;

    private String fullName;
    private String phone;
}

