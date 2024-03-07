import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import {
  digits,
  letters,
  lettersAndNumbers,
  lettersAndSymbols,
  lettersDigitsSymbols,
  symbols,
  symbolsAndNumbers,
} from "src/models/constants";
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
  bar0!: borderColor;
  bar1!: borderColor;
  bar2!: borderColor;

  ngOnInit(): void {
    this.unSubscriber.add(
      this.password.valueChanges.subscribe((val) => {
        if (!val) {
          this.setDefaultColors();
          return;
        }
        this.password.invalid
          ? this.setBorderErrorColor()
          : this.checkPasswordStrength(val);
      })
    );
  }

  checkPasswordStrength(value: string) {
    this.setDefaultColors();
    const lettersOnly = letters.test(value);
    const numbersOnly = digits.test(value);
    const symbolsOnly = symbols.test(value);
    const lettersNumbers = lettersAndNumbers.test(value);
    const lettersSymbols = lettersAndSymbols.test(value);
    const symbolsNumbers = symbolsAndNumbers.test(value);
    const valid = lettersDigitsSymbols.test(value);
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

  setBorderErrorColor() {
    this.bar0 = borderColor.RED;
    this.bar1 = borderColor.RED;
    this.bar2 = borderColor.RED;
  }

  setDefaultColors() {
    this.bar0 = borderColor.GRAY;
    this.bar1 = borderColor.GRAY;
    this.bar2 = borderColor.GRAY;
  }

  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
  }
}
