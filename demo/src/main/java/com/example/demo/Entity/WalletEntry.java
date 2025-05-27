package com.example.demo.Entity;
// package com.hari.Finance.Manager.Entity;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class WalletEntry {
    @Id @GeneratedValue
    private Long id;

    private Double morningCash;
    private Double nightCash;
    private LocalDate date;

    @ManyToOne
    private User user;
}
