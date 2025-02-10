package test;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;

public class Test04 {

    public Test04 () {
        System.out.println("Test04 - List, ArrayList\n");

        // Use Wrapper classes and not primitive types
        ArrayList<Integer> numbers = new ArrayList<>();
        ArrayList<Integer> oddNumbers = new ArrayList<>();
        ArrayList<Boolean> oddTruths = new ArrayList<>();

        oddNumbers.add(1);
        oddNumbers.add(3);
        oddTruths.add(false);
        oddTruths.add(false);
        System.out.println("new " + oddNumbers);

        ArrayList<Integer> moreOddNumbers = new ArrayList<>();
        moreOddNumbers.add(7);
        moreOddNumbers.add(9);
        moreOddNumbers.add(11);
        oddNumbers.addAll(moreOddNumbers);
        System.out.println("add " + oddNumbers);
        // moreOddNumbers.removeFirst();
        oddNumbers.removeAll(moreOddNumbers);
        System.out.println("rem " + oddNumbers);
        oddNumbers.clear();
        System.out.println("del " + oddNumbers + "\n");

        for (int i = 0; i <= 10; i++) {
            numbers.add(i);
        }
        System.out.println(numbers.toString());
        numbers.removeIf(number -> number % 2 == 1 || number == 0);
        System.out.println("Dividable by 2: " + numbers.toString());

        @SuppressWarnings("unchecked")
        ArrayList<Integer> cNumbers = (ArrayList<Integer>) numbers.clone();
        // Safer way to clone:
        ArrayList<Integer> c2Numbers = new ArrayList<>(numbers);

        // Sorting:
        numbers.sort(Comparator.reverseOrder());
        System.out.println("Sorted in reverse: " + numbers.toString());

        oddNumbers.add(3);
        oddNumbers.add(5);
        numbers.add(5);
        System.out.println("\nBefore: " + numbers + oddNumbers);
        numbers.retainAll(oddNumbers);
        System.out.println("oddnumbers in numbers: " + numbers);

        // For each, add new
        ArrayList<Integer> newOddNumbers = new ArrayList<>(oddNumbers);
        oddNumbers.forEach( number -> {
            newOddNumbers.add(number * 2);
            System.out.println("Current array: " + newOddNumbers);
        });

        // While, add new, Iterator is NOT AS SAFE when adding.
        Iterator<Integer> integerIterator = oddNumbers.iterator();
        while(integerIterator.hasNext()) {
            int n = integerIterator.next();
            oddNumbers.add(n * 2);
            System.out.println("Current array: " + oddNumbers);
        }
    }
}
