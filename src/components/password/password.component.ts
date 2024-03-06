import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { borderColor } from "src/models/enums";

@Component({
  selector: "password",
  templateUrl: "./password.component.html",
  styleUrls: ["./password.component.css"],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class PasswordComponent implements OnInit, OnDestroy {
  password = new FormControl("", [Validators.minLength(8)]);
  unSubscriber = new Subscription();
  bar0 = "";
  bar1 = "";
  bar2 = "";

  ngOnInit(): void {
    this.unSubscriber.add(
      this.password.valueChanges.subscribe((val) => {
        if (!val) {
          this.bar0 = borderColor.GRAY;
          this.bar1 = borderColor.GRAY;
          this.bar2 = borderColor.GRAY;
          return;
        }
        this.checkPasswordStrength(val);
      })
    );
  }

  checkPasswordStrength(value: string) {
    const lettersOnly = /\p{L}+/u.test(value);
    const numbersOnly = /\d/.test(value);
    const symbolsOnly = /[!-\/:-@[-`{-~]/.test(value);
    const lettersNumbers = /(?=.*\d)(?=.*[a-z])/.test(value);
    const lettersSymbols = /(?=.*\d)((?=.*\W)|(?=.*_))^[^ ]+$/.test(value);
    const symbolsNumbers = /(?=.*[a-z])((?=.*\W)|(?=.*_))^[^ ]+$/.test(value);
    const valid = /(?=.*\d)(?=.*[a-z])((?=.*\W)|(?=.*_))^[^ ]+$/.test(value);
    if (lettersOnly || numbersOnly || symbolsOnly) {
      this.bar0 = borderColor.RED;
    }

    if (lettersNumbers || lettersSymbols || symbolsNumbers) {
      this.bar0 = borderColor.ORANGE;
      this.bar1 = borderColor.ORANGE;
    }

    if (valid) {
      this.bar0 = borderColor.GREEN;
      this.bar1 = borderColor.GREEN;
      this.bar2 = borderColor.GREEN;
    }
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }
}
