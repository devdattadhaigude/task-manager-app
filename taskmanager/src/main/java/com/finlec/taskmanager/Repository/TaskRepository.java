package com.finlec.taskmanager.Repository;

import com.finlec.taskmanager.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Custom query method to find tasks only for a specific user id
    List<Task> findByUserId(Long userId);
}
