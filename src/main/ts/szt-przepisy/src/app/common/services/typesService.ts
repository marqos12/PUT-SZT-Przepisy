
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';


export class TypeService<T> {

  private types = new BehaviorSubject<T[]>([]);

  constructor(private url: string, private rest: RestService) {
    this.getAllRequest();
  }

  private getAllRequest() {
    this.rest.get<T[]>(this.url).subscribe(this.getAllResponse.bind(this))
  }

  public getAllResponse(types: T[]) {
    this.types.next(types);
  }

  public getAll(): Observable<T[]> {
    return this.types.asObservable();
  }

  public registerListener(callBack): Subscription {
    return this.getAll().subscribe(callBack);
  }
}

