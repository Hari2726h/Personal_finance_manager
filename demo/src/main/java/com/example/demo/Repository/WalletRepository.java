package com.example.demo.Repository;
// package com.hari.Finance.Manager.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.*;

public interface WalletRepository extends JpaRepository<WalletEntry, Long> {
    List<WalletEntry> findByUserId(Long userId);
}
