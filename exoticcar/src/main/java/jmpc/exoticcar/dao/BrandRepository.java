package jmpc.exoticcar.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import jmpc.exoticcar.entity.Brand;

@CrossOrigin("http://localhost:4200")
public interface BrandRepository extends JpaRepository<Brand, Integer> {

}
