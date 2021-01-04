
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';


export class TypeService<T> {

  private types = new BehaviorSubject<T[]>([]);

  constructor(protected url: string, protected rest: RestService) {
    this.getAllRequest();
  }

  protected getAllRequest() {
    this.rest.get<T[]>(this.url).subscribe(this.getAllResponse.bind(this))
  }

  public getAllResponse(types: T[]) {
    types = types.map(this.mapValue.bind(this))
    this.types.next(types);
  }

  protected mapValue(value) {
    return value;
  }

  public getAll(): Observable<T[]> {
    return this.types.asObservable();
  }

  public registerListener(callBack): Subscription {
    return this.getAll().subscribe(callBack);
  }
}

