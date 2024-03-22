import { body } from "express-validator";

  export const validateRigister=[

   body('email').isEmail().withMessage("email not validate").notEmpty().withMessage("email is required"),
   body('password').isLength({ min: 8 }).withMessage("password must be at least 8 characters")
     .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])/).withMessage("password must contain letters, numbers, and characters")
     .notEmpty().withMessage("password is required")
  ]




// import { NextFunction ,Request,Response} from "express";
// import { ValidationError,Result, body, validationResult } from "express-validator";



 



// // تابع سفارشی برای تغییر فرمت خروجی خطاها
// function customErrorHandler( error:ValidationError ){
//   return{
//     message: error.msg,
//     param: error.msg as string,

//   };
// }

// export  class validateRigister {

//    static validateRigister=[
//   // اعتبارسنجی فیلد email
//   body("email")
//     .isEmail()
//     .withMessage("email not validate")
//     .notEmpty()
//     .withMessage("email is required"),

//   // اعتبارسنجی فیلد password
//   body("password")
//     .isLength({ min: 8 })
//     .withMessage("password must be at least 8 characters")
//     .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])/)
//     .withMessage("password must contain letters, numbers, and characters")
//     .notEmpty()
//     .withMessage("password is required"),

//   // اعتبارسنجی سفارشی با استفاده از customErrorHandler
//   (  req: Request,
//     res: Response,
//     next: NextFunction) => {
//     const errors = validationResult(req).formatWith(customErrorHandler);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
// ]
// };
