package jmpc.exoticcar.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import jmpc.exoticcar.entity.CarModel;

@CrossOrigin("http://localhost:4200")
public interface CarModelRepository extends JpaRepository<CarModel, Integer> {

	Page<CarModel> findByBrandId(@RequestParam("id") Integer id, Pageable pageable);
	
	Page<CarModel> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
