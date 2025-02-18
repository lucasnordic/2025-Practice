package test;

import java.util.Arrays;
import java.util.Scanner;

public class Test02 {

    // Check if string is already in the pool.
    String name = "Didi";
    // Always create a new string
    String newName = new String("Dodo");
    int age = 22;

    public Test02 () {
        String formattedString = String.format("Name is %s and I'm %d years old", newName, age);
        System.out.println(formattedString);
        System.out.println(String.format("Length is %d, %s", formattedString.length(), newName));
        newName = "";
        if (newName.isEmpty()) {
            System.out.println("Ohh shit it's empty");
        }

        name = "Didi boba dedo maha koki nami";
        String[] test = name.split(" ");
        String test2 = Arrays.toString(name.split(" "));
        System.out.println(test2);
        System.out.println(String.join(" ", test));

        String original = "Hello Dude why don't you make some pancakes";
        String modified = original.replace("Dude", "Java");
        modified = modified.replace("pancakes", "babies");
        System.out.println("Original: " + original + " | Modified: " + modified);

        String lyric = "Roses are red but you are dead";
        if(lyric.toLowerCase().contains("dead")) {
            System.out.println("They speek of da dead");
        } else {
            System.out.println("No dead here fam");
        }

        System.out.println("lyric = " + lyric);
        System.out.printf("Dude who is \"%s\"?\n", name);
        System.out.println("Test02.Test02");

        Scanner sc = new Scanner(System.in);
        System.out.println("\nWho you be? ");
        String inputtedName = sc.nextLine();
        System.out.printf("So, %s. How old is ya be?\n", inputtedName);
        int inputtedAge = -1;
        while (inputtedAge <= 0) {
            try {
                inputtedAge = sc.nextInt();
                sc.nextLine(); // Clear buffer of dangling newline
            } catch (Exception e) {
                System.out.println("Only enter numbers 0 or higher");
                sc.nextLine(); // Clear buffer of invalid input
            }
        }
        System.out.printf("%d is such a fabulous year m8. Do you like it?\n", inputtedAge);
        sc.nextLine();
        System.out.println("Hell Yeah dude.");
        sc.close();

        System.out.println("What operation would you like to perform? sum, sub");
        String operation = sc.nextLine();

        switch (operation) {
            case "sum":
                System.out.printf("summy boi");
                break;
            case "sub":
                System.out.printf("subby eeey");
                break;
            default:
                System.out.println("Dude that's not a valid operation");
        }

        switch (operation) {
            case "div":
                System.out.println("divvv yeah");
                break;
            case "rem":
                System.out.println("rem eyyey");
                break;
            default:
                System.out.println("You done goofed now sun");
        }


    }
}
