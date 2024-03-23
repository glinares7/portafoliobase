import { Injectable } from '@nestjs/common';
import { Per } from './interfaces/per.interface';
// import { CreatePerDto } from './dto/create-per.dto';
// import { UpdatePerDto } from './dto/update-per.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PerService {
  public filePath = path.join(__dirname, '../../src/per/db/data.json');
  private jsonData = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));

  // private readonly person: Per[] = []¡;
  private person: Per[] = this.jsonData;
  private counter: number = this.jsonData.at(-1).id;

  create(per: Per) {
    this.counter++;
    this.person.push({ id: this.counter, ...per });

    const nuevoDato = JSON.stringify(this.person, null, 2);
    fs.writeFileSync(this.filePath, nuevoDato);
  }

  async findAll(): Promise<Per[]> {
    // console.log(data);

    return this.person;
    // return this.person;
  }

  findOne(id: number) {
    return this.person.find((item) => item.id == id);
  }

  update(id: number, nombre, apellido, age) {
    // return `This action updates a #${id} per ${updatePerDto.nombre}`;
    this.person.filter((item) => {
      item.id == id;

      if (item.id == id) {
        item['nombre'] = nombre;
        item['apellido'] = apellido;
        item['age'] = age;
      }
    });

    const updateDato = JSON.stringify(this.person, null, 2);
    fs.writeFileSync(this.filePath, updateDato);
  }

  remove(id: number) {
    // return `This action removes a #${id} per`;
    const forma = this.person.filter((item) => {
      // item.id == id;

      if (item.id != id) {
        return item;
      }
    });

    this.person = forma;

    const deleteDato = JSON.stringify(this.person, null, 2);
    fs.writeFileSync(this.filePath, deleteDato);
  }
}
