import java.io.FileWriter;
import java.io.IOException;


public class GenerateData {
    @SuppressWarnings("CallToPrintStackTrace")
    public static void main(String[] args) {
        String[][] students = {
            {"Alice", "101", "A"},
            {"Bob", "102", "B"},
            {"Charlie", "103", "C"}
        };


        String filePath = "index.html";


        try (FileWriter writer = new FileWriter(filePath)) {
            writer.write("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n");
            writer.write("    <meta charset=\"UTF-8\">\n");
            writer.write("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n");
            writer.write("    <title>Student Management System</title>\n");
            writer.write("    <link rel=\"stylesheet\" href=\"style.css\">\n");
            writer.write("</head>\n<body>\n");
            writer.write("    <div class=\"container\">\n");
            writer.write("        <h1>Student Management System</h1>\n");
            writer.write("        <h2>Student List</h2>\n");
            writer.write("        <table id=\"studentTable\">\n");
            writer.write("            <thead>\n<tr><th>Name</th><th>Roll Number</th><th>Grade</th></tr>\n</thead>\n");
            writer.write("            <tbody>\n");


            for (String[] student : students) {
                writer.write(String.format("                <tr><td>%s</td><td>%s</td><td>%s</td></tr>\n",
                        student[0], student[1], student[2]));
            }


            writer.write("            </tbody>\n");
            writer.write("        </table>\n");
            writer.write("    </div>\n</body>\n</html>");
        } catch (IOException e) {
            System.out.println("An error occurred while writing the file.");
            e.printStackTrace();
        }
    }
}
