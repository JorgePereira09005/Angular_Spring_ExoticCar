package jmpc.exoticcar.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import jmpc.exoticcar.entity.Brand;
import jmpc.exoticcar.entity.CarModel;
import jmpc.exoticcar.entity.Post;

@Configuration
public class DataRestconfig implements RepositoryRestConfigurer{

	private EntityManager entityManager;
	
	@Autowired
	public DataRestconfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		
		HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};
		
		//disable http methods for brand, carmodel: post, put, delete
		config.getExposureConfiguration()
			.forDomainType(Brand.class)
			.withItemExposure((metdata, httpMethods)-> httpMethods.disable(unsupportedActions))
			.withCollectionExposure((metdata, httpMethods)-> httpMethods.disable(unsupportedActions));
		
		config.getExposureConfiguration()
			.forDomainType(CarModel.class)
			.withItemExposure((metdata, httpMethods)-> httpMethods.disable(unsupportedActions))
			.withCollectionExposure((metdata, httpMethods)-> httpMethods.disable(unsupportedActions));
		
//		config.getExposureConfiguration()
//			.forDomainType(Post.class)
//			.withItemExposure((metdata, httpMethods)-> httpMethods.disable(unsupportedActions))
//			.withCollectionExposure((metdata, httpMethods)-> httpMethods.disable(unsupportedActions));
			
		exposeIds(config);
		
	}
	
	private void exposeIds(RepositoryRestConfiguration config) {
		//expose entity ids
		
		//get a list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		//create array of the entity types
		List<Class> entityClasses = new ArrayList<>();
		
		//get the entity types for the entities
		for (EntityType tempEntityType: entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}
		
		//expose the entity ids for the array of entity/domain types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
		
	}
	
}
