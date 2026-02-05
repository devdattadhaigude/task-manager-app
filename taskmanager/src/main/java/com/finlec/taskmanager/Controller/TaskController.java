package com.finlec.taskmanager.Controller;

import com.finlec.taskmanager.Entity.Task;
import com.finlec.taskmanager.Entity.TaskStatus;
import com.finlec.taskmanager.Entity.User;
import com.finlec.taskmanager.Repository.UserRepository;
import com.finlec.taskmanager.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000") // Allow React
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Task> getAllTasks(Principal principal) {
        return taskService.getTasksForUser(principal.getName());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setUser(user);

        // Manual check for String
        if (task.getStatus() == null || task.getStatus().isEmpty()) {
            task.setStatus("PENDING");
        }

        return ResponseEntity.ok(taskService.saveTask(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskService.getTaskById(id); // You might need to add this method to Service if missing

        task.setTitle(taskDetails.getTitle());
        task.setStatus(taskDetails.getStatus()); // Updates status to "COMPLETED"

        return ResponseEntity.ok(taskService.saveTask(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }
}