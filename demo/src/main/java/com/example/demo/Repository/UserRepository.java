package com.example.demo.Repository;
// package com.hari.Finance.Manager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
