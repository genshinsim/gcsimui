use std::ffi::{CStr, CString};
use std::os::raw::c_char;

#[link(name = "gsim", kind = "static")]
extern "C" {
    fn Run(config: GoString) -> *const c_char;
}

#[repr(C)]
struct GoString {
    a: *const c_char,
    b: i64,
}

pub fn run_sim(config: &str) -> String {
    let c_config = CString::new(config).expect("CString::new failed");
    let ptr = c_config.as_ptr();
    let go_string = GoString {
        a: ptr,
        b: c_config.as_bytes().len() as i64,
    };
    let result = unsafe { Run(go_string) };
    let c_str = unsafe { CStr::from_ptr(result) };
    let string = c_str.to_str().expect("Error translating gsim result from library");
    // match string.is_empty() || string.starts_with("Error") {
    //     true => Err(AppError::SQIP {}),
    //     false => Ok(),
    // }
    // println!("{}", string);

    string.to_string()
}