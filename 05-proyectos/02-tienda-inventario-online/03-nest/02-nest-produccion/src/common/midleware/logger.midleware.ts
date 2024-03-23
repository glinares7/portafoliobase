import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from 'src/auth/constansts';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req.params['0'];
    // const token = req.params['1'];

    console.log('parametro', id);

    console.log('token header middleware', req.headers.authorization);

    const authorization = req.headers.authorization;

    if (authorization) {
      // console.log('token del param', token);
      try {
        const decoded: any = await this.jwtService.verifyAsync(authorization, {
          secret: jwtConstants.secret, // Ajusta esto según tus necesidades
        });

        // Verifica si el token ha expirado
        // const isTokenExpired = Date.now() >= decoded.exp * 1000;
        // if (isTokenExpired) {
        //   return res.status(401).json({ message: 'Token has expired' });
        // }

        if (decoded.id != id) {
          console.log('token no autorizado');
          return res
            .status(401)
            .json({ message: 'Token no autorizado middleware' });
        }
        // req['user'] = decoded; // Decodificado y disponible para rutas posteriores
        next();
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired catch' });
        }
        return res.status(401).json({ message: 'Invalid token catch' });
      }
    } else {
      return res.status(500).json({ message: ' token null catch ' });
    }

    // const decoded: any = await this.jwtService.verifyAsync(token, {
    //   secret: jwtConstants.secret, // Ajusta esto según tus necesidades
    // });
    // console.log('payload middleware paso', decoded);
    // if (token) {
    //   // Decodificado y disponible para rutas posteriores

    //   try {
    //     if (decoded.id != id) {
    //       console.log('token no autorizado');
    //       return res
    //         .status(401)
    //         .json({ message: 'Token no autorizado middleware' });
    //     }
    //   } catch (error) {
    //     if (error.name === 'TokenExpiredError') {
    //       console.log('token expiro');

    //       return res
    //         .status(401)
    //         .json({ message: 'Token has expired middleware' });
    //     }
    //   }
    //   next();
    // }
  }
}
