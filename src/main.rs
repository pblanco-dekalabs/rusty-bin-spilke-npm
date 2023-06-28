use std::{fs::File, io::Write};

fn main() {
    let mut file = File::create("my-foo.txt").unwrap();
    file.write_all("Hello from the foo!".as_bytes()).unwrap();
    println!("Done my bro.");
}
