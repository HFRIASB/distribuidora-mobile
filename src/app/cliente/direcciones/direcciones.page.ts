import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
  }
  goProductos(){
    this.router.navigate(['/home'], { relativeTo: this.route })}

}
