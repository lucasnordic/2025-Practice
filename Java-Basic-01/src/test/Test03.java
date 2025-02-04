package test;

import java.util.Arrays;

public class Test03 {

    public Test03 () {
        System.out.println("Test03 - Arrays\n");

        char vowels[] = new char[5];
        char vowelsFilled[] = {'a', 'b', 'c'};
        System.out.println(Arrays.toString(vowelsFilled) + "\n");

        int medicineDays[][] = {
                {1,2,3,4,5,6,7},
                {2,5,4,2,6,2,3},
                {0,6,3,6,0,3,2},
                {0,9,6,6,5,3,8},
        };
        int medicineDays2[][] = {
                {1,2,3,4,5,6,7},
                {2,5,4,2,6,2,3},
                {0,6,3,6,0,3,2},
                {0,9,6,6,5,3,8},
        };
        boolean areEqual = Arrays.deepEquals(medicineDays, medicineDays2);
        System.out.print("The arrays are entirely equal: " + areEqual);
        System.out.println();

        for (int i = 0; i < medicineDays.length; i++) {
            int startIndex = 0;
            int endIndex = medicineDays[i].length;
            Arrays.sort(medicineDays[i], startIndex, endIndex);
        }
        System.out.println(Arrays.deepToString(medicineDays).replace("],", "]\n") + "\n");

        int foundItemIdx = Arrays.binarySearch(medicineDays[0], 3);
        System.out.println(foundItemIdx + "\n");

        System.out.println(Arrays.toString(vowelsFilled));
        Arrays.fill(vowelsFilled, 'x');
        System.out.println(Arrays.toString(vowelsFilled) + "\n");

        vowelsFilled = new char[] {'a', 'b', 'c'};
        System.out.println(Arrays.toString(vowelsFilled));
        Arrays.fill(vowelsFilled, 1, 2, 'x');
        System.out.println(Arrays.toString(vowelsFilled) + "\n");

        char c1[] = vowelsFilled;
        char c2[] = Arrays.copyOf(vowelsFilled, vowelsFilled.length);
        c2[0] = 'x';
        char c3[] = Arrays.copyOfRange(vowelsFilled, 2,vowelsFilled.length);
        System.out.println(Arrays.toString(c1) + Arrays.toString(c2) + Arrays.toString(c3));

        boolean bool = Arrays.equals(c1,c2);
        System.out.println(Arrays.toString(c1) + " = " + Arrays.toString(c2) + " is " + bool);

        for(char c : c1) {
            System.out.println(c);
        }
    }
}
