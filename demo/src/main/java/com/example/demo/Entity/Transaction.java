package com.example.demo.Entity;

// package com.hari.Finance.Manager.Entity;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Transaction {
    @Id @GeneratedValue
    private Long id;

    private String title;
    private Double amount;
    private String type; // "income" or "expense"
    // private LocalDate date;
    private String category; // e.g., Food, Bills
    private String paymentMethod; // e.g., Cash, Card
    private boolean emotional;
     @ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "user_id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password"})
private User user;

@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
private LocalDate date;



}
