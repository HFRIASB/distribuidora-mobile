import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  image = "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"
  



  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  register(form) {
    console.log(form.value)
    this.router.navigate(['/home'])
  }

  goBack() {
    this.router.navigate(['/login'], { relativeTo: this.route, replaceUrl: true })
  }

}
