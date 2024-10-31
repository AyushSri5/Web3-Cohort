use rand::{Rng,thread_rng};
mod own;
// // fn main() {
// //     // println!("{}",is_even(20));
// //     // println!("{}",fib(5));
// //     // let name = String::from("Hello world!");
// //     // let len = get_len(name);
// //     // println!("The length of the string is {}",len);
// //     let user = User {
// //         first_name: String::from("Harkirat"),
// //         last_name: String::from("Singh"),
// //         age: 32,
// //     };

// //     println!("{}", user.first_name);
    
// // }

// // fn is_even(num: i32) -> bool {
// //     if num % 2 == 0 {
// //         return true;
// //     } 
// //     return false;
// // }

// // fn fib(num: u32) -> u32 {
// //     let mut first = 0;
// //     let mut second = 1;
// //     if (num == 0){
// //         return first;
// //     }
// //     if (num ==1){
// //         return second;
// //     }
// //     for _ in 0..(num - 1) {
// //         let temp = second;
// //         second = second + first;
// //         first = temp;
// //     }
// //     return second;
// // }

// // fn get_len(s: String) -> usize {
// //     return s.chars().count();
// // }

// // Structs
// // ----------------------------------------------------------------

// // struct User {
// //     first_name: String,
// //     last_name: String,
// //     age: i32,
// // }


// // ------------------------------
// // Implementation of structs
// // struct Rect {
// //     width: i32,
// //     height: i32,
// // }

// // impl Rect {
// //     fn area(&self) -> i32 {
// //         self.width * self.height
// //     }

// //     fn perimeter(&self, num: i32) -> i32 {
// //         2 * (self.width + self.height)
// //     }

// //     fn debug() -> i32 {
// //         return 1;
// //     }
// // }

// // fn main() {
// //     let rect1 = Rect {
// //         width: 10,
// //         height: 20,
// //     };

// //     println!("area is {}", rect1.area());
// //     println!("perimeter is {}", rect1.perimeter(1));
// //     println!("debug is {}", Rect::debug());
// // }

// // Enums


// enum Shape {
//     Rectangle(f64, f64), // width, height
//     Circle(f64),         // radius
// }

// fn main() {
//     // let rect = Shape::Rectangle(1.0, 2.0);
//     // calculate_area(rect);
//     // let circle = Shape::Circle(1.0);
//     // let result = calculate_area(circle);
//     // println!("result is {}", result);
//     let index = first_a(String::from("Ayaush"));

//     match index {
//         Some(value) => println!("index is {}", value),
//         None => println!("a not found"),
//     }
// }

// fn calculate_area(shape: Shape) -> f64 {
//     match shape {
//         Shape::Rectangle(a, b) => a * b,
//         Shape::Circle(r) => 3.14 * r * r,
//     }
// }

// // Options 

// fn first_a(s: String) -> Option<i32> {
//     let mut i = 0;

use std::{char, collections::HashMap, fs, vec};

//     for(index,char) in s.chars().enumerate() {
//         if char == 'a'{
//             return Some(i as i32);
//         }
//     }
//     return None;
// }
// ---------------------------------------NEW --------------------------------
// fn main() {
//     println!("Hello world");
//     let index : i32 = 100;
//     let mut num: u32 = 124;
//     for i in 0..100 {
//         num += 127;
//     }
//     println!("Number: {}", num);
//     let is_male = false;
//     let is_above_18 = true;
    
//     if is_male {
//         println!("You are a male");

//     } else {
//         println!("You are not a male");
//     }

//     if is_male && is_above_18 {
//         print!("You are a legal male");
//     }

//     let x: &str = "ayush";
//     println!("X: {}", x);
//     let name: String = String::from("ayush");
//     let ch: Option<char> = get_first(name);

//     println!("{}",ch.unwrap());
// }
// fn get_first(name: String) -> Option<char> {
//     let x : String = String::from("ayush");
//     x.push_str("ch");
//     return name.chars().nth(0);
// }
fn main() {
    // stack_fn();   // Call the function that uses stack memory
    // heap_fn();    // Call the function that uses heap memory
    // update_string();  // Call the function that changes size of variable at runtime
    let s1: String = String::from("Hello World");
    println!("{}",s1);

    let s2: String =s1;
    let mut my_string = String::from("hello");
    takes_ownership(my_string);
    // println!("{}", my_string); 
    let s3: String = String::from("Ayush Sri");
    let s4 = &s3;
    // println!("{}", s3);
    // println!("{}", s4);
    let mut s1 = String::from("Hello");
    let s2 = &mut s1;
    update_word(s2);
    let s3 = &s1;
    
    // println!("{}", s1);
    // println!("{}", s2);

    let user = User{
        active: false,
        name: String::from("Ayush"),
        email: String::from("ayushs@gmail.com"),
        age:12
    };
    // println!("User name: {}", user.name);
    let rect = Rect {
        width: 30,
        height: 50,
    };
    println!("The area of the rectangle is {}", rect.area());
    move_around(Direction::North);
    let circle = Shape::Circle(5.0);
    let square = Shape::Square(4.0);
    let rectangle = Shape::Rectangle(3.0, 6.0);

    // println!("Area of circle: {}", calculate_area(circle));
    // println!("Area of square: {}", calculate_area(square));
    // println!("Area of rectangle: {}", calculate_area(rectangle));
    let integer_point = Point { x:9 , y:"a",z:"b"};
    // println!("Point {} {} {}",integer_point.x,integer_point.y,integer_point.z)
    let res= fs::read_to_string("example.txt");

    match res {
        Ok(contents) => println!("Result {}",contents),
        Err(err) => println!("Error: {}", err)
    };

    for character in s3.chars() {
        // println!("Character {}", character);
    }
    let mut rng = thread_rng();
    let n: u32 = rng.gen();
    println!("Random number: {}", n);

    // Vectors
    let mut vecto = Vec::new();
    vecto.push(1);
    vecto.push(2);
    vecto.push(3);
    println!("{:?}",vecto.get(0));
    let mut map = HashMap::new();
    map.insert(String::from("ayush"), 23);
    map.insert(String::from("abc"),22);

    let user = map.get("abc");
    let mut nums = vec![1,2,3,4,5];
    let mut itr = nums.iter();
    let updated:Vec<i32> = itr.clone().map(|x| x+1).collect();
    println!("Updated: {:?}",updated);
    let first = itr.next();
    let second = itr.next();

    // Memory Management

}

fn stack_fn() {
    // Declare a few integers on the stack
    let a = 10;
    let b = 20;
    let c = a + b;
    println!("Stack function: The sum of {} and {} is {}", a, b, c);
}

fn heap_fn() {
    // Create a string, which is allocated on the heap
    let s1 = String::from("Hello");
    let s2 = String::from("World");
    let combined = format!("{} {}", s1, s2);
    println!("Heap function: Combined string is '{}'", combined);
}

fn update_string() {
    // Start with a base string on the heap
    let mut s = String::from("Initial string");
    println!("Before update: {}", s);
    println!("Capacity: {}, Length: {}, Pointer: {:p}",s.capacity(),s.len(),s.as_ptr());

    // Append some text to the string
    s.push_str(" and some additional text");
    println!("After update: {}", s);
    println!("Capacity: {}, Length: {}, Pointer: {:p}",s.capacity(),s.len(),s.as_ptr());

}

fn takes_ownership(some_string: String) -> String {
    println!("{}", some_string); // `some_string` now owns the data.
    return some_string;
}

fn update_word(word: &mut String) {
    word.push_str(" World");
}

struct User {
    active: bool,
    name: String,
    email: String,
    age: i32
}
struct Rect {
    width: u32,
    height: u32,
 }
 
 impl Rect {
     fn area(&self) -> u32 {
          self.width * self.height
     }
 }
 enum Direction {
    North,
    South,
    West,
    East
 }

 fn move_around(direction: Direction) {

 }
 enum Shape {
    Circle(f64),  // Variant with associated data (radius)
    Square(f64),  // Variant with associated data (side length)
    Rectangle(f64, f64),  // Variant with associated data (width, height)
}

struct Point<A,B> {
    x: A,
    y: B,
    z: B
}

// Function to calculate area based on the shape
fn calculate_area(shape: Shape) -> f64 {
    // calculates the area of the shape 
    let ans=match shape {
        Shape::Circle(radius) => std::f64::consts::PI*radius*radius,
        Shape::Rectangle(len,bred ) => len*bred,
        Shape::Square(side) => side*side
    };
    return ans;
}

enum Result<A,B> {

    Ok(A),
    Err(B)
}

fn even_filter(vec: Vec<i32>) -> Vec<i32>{
    let mut result: Vec<i32> = Vec::new();
    for i in vec{
        if i%2 == 0{
        result.push(i);
        }
    }
    return result;
}