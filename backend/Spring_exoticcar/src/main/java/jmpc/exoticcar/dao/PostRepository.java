package jmpc.exoticcar.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import jmpc.exoticcar.entity.CarModel;
import jmpc.exoticcar.entity.Post;

@CrossOrigin("http://localhost:4200")
public interface PostRepository extends JpaRepository<Post, Integer> {

	Page<CarModel> findByCarModelId(@RequestParam("id") Integer id, Pageable pageable);
}
