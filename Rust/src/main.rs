// fn main() {
//     // println!("{}",is_even(20));
//     // println!("{}",fib(5));
//     // let name = String::from("Hello world!");
//     // let len = get_len(name);
//     // println!("The length of the string is {}",len);
//     let user = User {
//         first_name: String::from("Harkirat"),
//         last_name: String::from("Singh"),
//         age: 32,
//     };

//     println!("{}", user.first_name);
    
// }

// fn is_even(num: i32) -> bool {
//     if num % 2 == 0 {
//         return true;
//     } 
//     return false;
// }

// fn fib(num: u32) -> u32 {
//     let mut first = 0;
//     let mut second = 1;
//     if (num == 0){
//         return first;
//     }
//     if (num ==1){
//         return second;
//     }
//     for _ in 0..(num - 1) {
//         let temp = second;
//         second = second + first;
//         first = temp;
//     }
//     return second;
// }

// fn get_len(s: String) -> usize {
//     return s.chars().count();
// }

// // Structs
// // ----------------------------------------------------------------

// struct User {
//     first_name: String,
//     last_name: String,
//     age: i32,
// }


// ------------------------------
// Implementation of structs
struct Rect {
    width: i32,
    height: i32,
}

impl Rect {
    fn area(&self) -> i32 {
        self.width * self.height
    }

    fn perimeter(&self, num: i32) -> i32 {
        2 * (self.width + self.height)
    }

    fn debug() -> i32 {
        return 1;
    }
}

fn main() {
    let rect1 = Rect {
        width: 10,
        height: 20,
    };

    println!("area is {}", rect1.area());
    println!("perimeter is {}", rect1.perimeter(1));
    println!("debug is {}", Rect::debug());
}