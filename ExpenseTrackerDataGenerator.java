import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExpenseTrackerDataGenerator {
    public static void main(String[] args) {
        // Sample expenses to populate the JSON file
        List<Map<String, String>> expenses = new ArrayList<>();

        // Adding some example expenses
        expenses.add(createExpense("Groceries", "50", "Food"));
        expenses.add(createExpense("Movie Tickets", "30", "Entertainment"));
        expenses.add(createExpense("Bus Ticket", "15", "Transport"));

        // Convert to JSON format
        String jsonData = convertToJSON(expenses);

        // Save the JSON data to a file
        try (FileWriter file = new FileWriter("expenses-data.json")) {
            file.write(jsonData);
            System.out.println("Expense data successfully written to expenses-data.json");
        } catch (IOException e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }

    // Helper function to create an expense entry
    private static Map<String, String> createExpense(String description, String amount, String category) {
        Map<String, String> expense = new HashMap<>();
        expense.put("description", description);
        expense.put("amount", amount);
        expense.put("category", category);
        return expense;
    }

    // Function to convert the list of expenses to JSON format
    private static String convertToJSON(List<Map<String, String>> expenses) {
        StringBuilder jsonBuilder = new StringBuilder("[\n");
        for (Map<String, String> expense : expenses) {
            jsonBuilder.append("  {\n");
            for (Map.Entry<String, String> entry : expense.entrySet()) {
                jsonBuilder.append("    \"").append(entry.getKey()).append("\": \"").append(entry.getValue()).append("\",\n");
            }
            jsonBuilder.setLength(jsonBuilder.length() - 2); // Remove trailing comma
            jsonBuilder.append("\n  },\n");
        }
        jsonBuilder.setLength(jsonBuilder.length() - 2); // Remove trailing comma
        jsonBuilder.append("\n]");
        return jsonBuilder.toString();
    }
}
